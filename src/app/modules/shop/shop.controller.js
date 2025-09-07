import { shopService } from "./shop.service.js";

const getAllShopItems = async (req, res) => {
  const result = await shopService.getAllShopItems();
  res.send(result);
};

const getSellerItems = async (req, res) => {
  const email = req.query.email;
  const result = await shopService.getSellerItems(email);
  res.send(result);
};

const addShopItem = async (req, res) => {
  const data = req.body;
  const result = await shopService.addShopItem(data);
  res.send(result);
};

export const shopController = {
  getAllShopItems,
  getSellerItems,
  addShopItem,
};