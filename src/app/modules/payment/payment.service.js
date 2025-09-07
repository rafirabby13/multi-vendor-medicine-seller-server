
import Stripe from "stripe";
import { client } from "../../config/database.js";
import { envVars } from "../../config/env.js";

const stripe = new Stripe(envVars.paymentSecretKey);


const paymentCollection = client.db("medicineSelling").collection("payment");
const cartCollection = client.db("medicineSelling").collection("cart");

const createPaymentIntent = async (price) => {
  const amount = parseInt(price * 100);
  // console.log(amount);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    payment_method_types: ["card"],
  });

  return {
    clientSecret: paymentIntent.client_secret,
  };
};

const createPayment = async (payment) => {
  // console.log(payment);

  const result = await paymentCollection.insertOne(payment);

  //    delete each items from the cart

  const query = {
    _id: {
      $in: payment.cartId.map((id) => new ObjectId(id)),
    },
  };

  const deletedResult = await cartCollection.deleteMany(query);

  return { result, deletedResult };
};

const getSellerPayments = async (email) => {
  const query = {
    sellerEmail: email,
  };

  const result = await paymentCollection.find(query).toArray();
  return result;
};

const acceptPayment = async (id) => {
  const query = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const updateDoc = {
    $set: {
      status: 'Paid',
    },
  };
  const result = await paymentCollection.updateOne(query, updateDoc, options);
  return result;
};

const getAllPayments = async () => {
  const query = {};
  const result = await paymentCollection.find(query).toArray();
  return result;
};

export const paymentService = {
  createPaymentIntent,
  createPayment,
  getSellerPayments,
  acceptPayment,
  getAllPayments,
};
