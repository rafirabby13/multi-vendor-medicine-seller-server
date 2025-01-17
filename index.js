const express = require("express");
const app = express();
require("dotenv").config();

const jwt = require("jsonwebtoken");
const cors = require("cors");

const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY);

const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

app.use(cors());
app.use(express.json());
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bbiovs6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const cartCollection = client.db("medicineSelling").collection("cart");
    const paymentCollection = client
      .db("medicineSelling")
      .collection("payment");
    const usersCollection = client.db("medicineSelling").collection("users");
    const bannerCollection = client.db("medicineSelling").collection("banner");
    const medicineCategoryCollection = client.db("medicineSelling").collection("category");

    // JWt related api's

    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, `${process.env.ACCESS_TOKEN_KEY}`, {
        expiresIn: "5h",
      });
      res.send({ token });
    });

    // jwt middleware
    // console.log(req.headers.authorization.split(' ')[1]);

    const verifyToken = (req, res, next) => {
      // console.log(
      //   "inside verify token ",
      //   req.headers.authorization.split(" ")[1]
      // );
      // console.log("inside verify token ", req.headers);
      if (!req.headers.authorization) {
        return res.status(401).send({ message: "Un-hatori access" });
      }
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_KEY, function (err, decoded) {
        if (err) {
          return res.status(401).send({ message: "Un-hatori access" });
        }
        req.decoded = decoded;

        next();
      });
    };


    // verify admin

    const verifyAdmin = async (req, res, next)=>{
      

      // console.log(req.decoded);
      const query = {email: req.decoded.email}
      const result = await usersCollection.findOne(query)

      const role = result.role
      if (role !== 'admin') {
        return res.status(401).send({message: 'kiyu bacchu , pakar liya na!!'})
      }

      next()


    }

    // Cart routes

    app.post("/cart", async (req, res) => {
      const cartData = req.body;
      //   console.log(cartData);
      const result = await cartCollection.insertOne(cartData);
      res.send(result);
    });
    app.get("/cart", async (req, res) => {
      const email = req.query.email;

      const query = {
        email: email,
      };

      const result = await cartCollection.find(query).toArray();
      res.send(result);
    });

    app.patch("/cart/inc/:id", async (req, res) => {
      const id = req.params.id;

      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $inc: {
          quantity: 1,
        },
      };
      const result = await cartCollection.updateOne(query, updateDoc, options);
      res.send(result);
    });
    app.patch("/cart/dec/:id", async (req, res) => {
      const id = req.params.id;

      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $inc: {
          quantity: -1,
        },
      };
      const result = await cartCollection.updateOne(query, updateDoc, options);
      res.send(result);
    });
    app.delete("/cart/:id", async (req, res) => {
      const id = req.params.id;

      const query = { _id: new ObjectId(id) };

      const result = await cartCollection.deleteOne(query);
      res.send(result);
    });

    app.delete("/cart", async (req, res) => {
      const query = {};

      const result = await cartCollection.deleteMany(query);
      res.send(result);
    });

    //   payment api

    app.post("/create-payment-intent", async (req, res) => {
      const { price } = req.body;
      const amount = parseInt(price * 100);
      // console.log(amount);

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });

      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });

    app.post("/payments", async (req, res) => {
      const payment = req.body;
      console.log(payment);

      
 
      
     
      const result = await paymentCollection.insertOne(payment);

      //    delete each items from the cart

      const query = {
        _id: {
          $in: payment.cartId.map((id) => new ObjectId(id)),
        },
      };
      
      const deletedResult = await cartCollection.deleteMany(query);

      res.send({ result, deletedResult });
    });


    




    //  Admin Dashboard related Api's

    app.get("/total-payment-paid", async (req, res) => {
      const query = {};

      const result = await paymentCollection.find().toArray();
      res.send(result);
    });

    //   Users related api's

    app.post("/users", async (req, res) => {
      const usersData = req.body;
      //   console.log(cartData);
      const query = { email: usersData.email };
      const isExist = await usersCollection.findOne(query);
      if (!isExist) {
        const result = await usersCollection.insertOne(usersData);
        res.send(result);
      }
    });

    app.get("/users", verifyToken,verifyAdmin, async (req, res) => {
      const query = {};

      const result = await usersCollection.find(query).toArray();
      res.send(result);
    });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    app.get("/users/role", verifyToken, async (req, res) => {
      // console.log(req.decoded.email);
      const query = {email: req.decoded.email};

      const result = await usersCollection.findOne(query);
      // console.log(result);
      res.send(result.role);
    });

    app.get("/myPayment", verifyToken, async (req, res) => {
      const email = req.query.email
      const query = {email: email};

      const result = await paymentCollection.find(query).toArray();
      // console.log(result);
      res.send(result);
    });


    // update users role 

    app.post("/user/role/:id", async (req, res) => {
      const id = req.params.id
      const role = req.body;
      console.log(role, id);


      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          role: role.updateRole,
        },  
      };
      const result = await usersCollection.updateOne(query, updateDoc, options);
      res.send(result);
    });

    // banner related api's

    app.post('/banner', async (req, res)=>{
      const bannerData = req.body;
      const result = await bannerCollection.insertOne(bannerData)
      res.send(result)
    })


    app.get("/banner", verifyToken, async (req, res) => {
      // console.log(req.decoded.email);
      const query = {};

      const result = await bannerCollection.find(query).toArray();
      // console.log(result);
      res.send(result);
    });

    app.patch("/banner/:id", async (req, res) => {
      const id = req.params.id;
     
      const query = { _id: new ObjectId(id) };

      const currentBanner = await bannerCollection.findOne(query)
      // console.log(currentBanner.isActive);

      const options = { upsert: true };
      const updateDoc = {
        $set: {
          isActive: !currentBanner.isActive,
        },
      };
      const result = await bannerCollection.updateOne(query, updateDoc, options);
      res.send(result);
    });



    app.get("/banner/active", async (req, res) => {
      // console.log(req.decoded.email);
      const query = {isActive: true};
      // console.log(query);

      const result = await bannerCollection.find(query).toArray();
      // console.log(result);
      res.send(result);
    });


    // medicine category related api's

    app.get("/medicine-category",verifyToken, async (req, res) => {
      // console.log(req.decoded.email);
      const query = {};
      // console.log(query);

      const result = await medicineCategoryCollection.find(query).toArray();
      // console.log(result);
      res.send(result);
    });

    app.get("/medicine-all-category", async (req, res) => {
      // console.log(req.decoded.email);
      const query = {};
      // console.log(query);

      const result = await medicineCategoryCollection.find(query).toArray();
      // console.log(result);
      res.send(result);
    });
    app.get("/medicine-category/:id",verifyToken, async (req, res) => {
      
      const  id = req.params.id;
      const query = {_id: new ObjectId(id)};
      // console.log(query);

      const result = await medicineCategoryCollection.findOne(query);
      // console.log(result);
      res.send(result);
    });

    // update category related api

    app.post("/category/update", async (req, res) => {
      
      const updatedData = req.body;
      // console.log(updatedData);

      const query = { _id: new ObjectId(updatedData.id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          name: updatedData.name,
          image: updatedData.image
        },
      };
      const result = await medicineCategoryCollection.updateOne(query, updateDoc, options);
      // console.log(result);
      res.send(result);
    });

       app.post("/category/add", async (req, res) => {
      
      const updatedData = req.body;
      

    
      const result = await medicineCategoryCollection.insertOne(updatedData);
      res.send(result);
    });


    app.delete("/category/:id", async (req, res) => {
      const id = req.params.id;

      const query = { _id: new ObjectId(id) };

      const result = await medicineCategoryCollection.deleteOne(query);
      res.send(result);
    });



    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );






  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Medicine vendor selling medicines...haha");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
