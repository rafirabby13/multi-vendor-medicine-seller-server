import { ObjectId } from "mongodb";
import { client } from "../../config/database.js";


const cartCollection = client.db("medicineSelling").collection("cart");

const addToCart = async (cartData) => {
  const cartDataPOst = {
    ...cartData,
    _id: new ObjectId(),
  };
  const result = await cartCollection.insertOne(cartDataPOst);
  return result;
};

const getCartByEmail = async (email) => {
  const query = {
    email: email,
  };
  const result = await cartCollection.find(query).toArray();
  return result;
};

const incrementQuantity = async (id) => {
  console.log(id);
  const query = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const updateDoc = {
    $inc: {
      quantity: 1,
    },
  };
  const result = await cartCollection.updateOne(query, updateDoc, options);
  console.log(result);
  return result;
};

const decrementQuantity = async (id) => {
  const query = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const updateDoc = {
    $inc: {
      quantity: -1,
    },
  };
  const result = await cartCollection.updateOne(query, updateDoc, options);
  return result;
};

const removeFromCart = async (id) => {
  const query = { _id: new ObjectId(id) };
  const result = await cartCollection.deleteOne(query);
  return result;
};

const clearCart = async (cartByEmail) => {
  console.log(cartByEmail);
  
  const query = {
    _id: {
      $in: cartByEmail.map((id) => new ObjectId(id)),
    },
  };

  const deletedResult = await cartCollection.deleteMany(query);
  return deletedResult;
};

export const cartService = {
  addToCart,
  getCartByEmail,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
};