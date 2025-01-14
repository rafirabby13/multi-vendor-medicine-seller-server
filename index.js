const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
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

    // Cart routes

    app.post("/cart", async (req, res) => {
      const cartData = req.body;
      console.log(cartData);
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
  
        const query = {_id: new ObjectId(id)};
        const options = { upsert: true };
        const updateDoc = {
            $inc: {
                quantity: 1
            },
          };
        const result = await cartCollection.updateOne(query,updateDoc,options);
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
