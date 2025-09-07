import { ObjectId } from "mongodb";
import { client } from "../../config/database.js";

const usersCollection = client.db("medicineSelling").collection("users");
const paymentCollection = client.db("medicineSelling").collection("payment");

const createUser = async (usersData) => {
  //   console.log(cartData);
  const query = { email: usersData.email };
  const isExist = await usersCollection.findOne(query);
  if (!isExist) {
    const result = await usersCollection.insertOne(usersData);
    return result;
  }
  return null; // User already exists
};

const getAllUsers = async () => {
  const query = {};
  const result = await usersCollection.find(query).toArray();
  return result;
};

const getUserRole = async (email) => {
  // console.log(req.decoded.email);
  const query = { email: email };
  const result = await usersCollection.findOne(query);
  // console.log(result);
  return result.role;
};

const getMyPayments = async (email) => {
  const query = { buyerEmail: email };
  const result = await paymentCollection.find(query).toArray();
  // console.log(result);
  return result;
};

const updateUserRole = async (id, role) => {
  console.log(role, id);
  
  const query = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const updateDoc = {
    $set: {
      role: role.updateRole,
    },
  };
  const result = await usersCollection.updateOne(query, updateDoc, options);
  return result;
};

export const userService = {
  createUser,
  getAllUsers,
  getUserRole,
  getMyPayments,
  updateUserRole,
};