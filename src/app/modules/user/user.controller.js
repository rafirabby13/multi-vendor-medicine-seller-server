import { userService } from "./user.service.js";

const createUser = async (req, res) => {
  const usersData = req.body;
  const result = await userService.createUser(usersData);
  if (result) {
    res.send(result);
  } else {
    // User already exists, send nothing (keeping original behavior)
    res.send();
  }
};

const getAllUsers = async (req, res) => {
  const result = await userService.getAllUsers();
  res.send(result);
};

const getUserRole = async (req, res) => {
  const email = req.decoded.email;
  const result = await userService.getUserRole(email);
  res.send(result);
};

const getMyPayments = async (req, res) => {
  const email = req.query.email;
  const result = await userService.getMyPayments(email);
  res.send(result);
};

const updateUserRole = async (req, res) => {
  const id = req.params.id;
  const role = req.body;
  const result = await userService.updateUserRole(id, role);
  res.send(result);
};

export const userController = {
  createUser,
  getAllUsers,
  getUserRole,
  getMyPayments,
  updateUserRole,
};
