import { cartService } from "./cart.service.js";

const addToCart = async (req, res) => {
  const cartData = req.body;
  //   console.log(cartData);
  const result = await cartService.addToCart(cartData);
  res.send(result);
};

const getCart = async (req, res) => {
  const email = req.query.email;
  const result = await cartService.getCartByEmail(email);
  res.send(result);
};

const incrementQuantity = async (req, res) => {
  const id = req.params.id;
  const result = await cartService.incrementQuantity(id);
  res.send(result);
};

const decrementQuantity = async (req, res) => {
  const id = req.params.id;
  const result = await cartService.decrementQuantity(id);
  res.send(result);
};

const removeFromCart = async (req, res) => {
  const id = req.params.id;
  const result = await cartService.removeFromCart(id);
  res.send(result);
};

const clearCart = async (req, res) => {
  const cartByEmail = req.body;
  const result = await cartService.clearCart(cartByEmail);
  res.send(result);
};

export const cartController = {
  addToCart,
  getCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
};