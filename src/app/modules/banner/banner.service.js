import { ObjectId } from "mongodb";
import { client } from "../../config/database.js";

const bannerCollection = client.db("medicineSelling").collection("banner");

const createBanner = async (bannerData) => {
  const result = await bannerCollection.insertOne(bannerData);
  return result;
};

const getAllBanners = async () => {
  // console.log(req.decoded.email);
  const query = {};
  const result = await bannerCollection.find(query).toArray();
  // console.log(result);
  return result;
};

const toggleBannerStatus = async (id) => {
  const query = { _id: new ObjectId(id) };

  const currentBanner = await bannerCollection.findOne(query);
  // console.log(currentBanner.isActive);

  const options = { upsert: true };
  const updateDoc = {
    $set: {
      isActive: !currentBanner.isActive,
    },
  };
  const result = await bannerCollection.updateOne(
    query,
    updateDoc,
    options
  );
  return result;
};

const getActiveBanners = async () => {
  // console.log(req.decoded.email);
  const query = { isActive: true };
  // console.log(query);

  const result = await bannerCollection.find(query).toArray();
  // console.log(result);
  return result;
};

export const bannerService = {
  createBanner,
  getAllBanners,
  toggleBannerStatus,
  getActiveBanners,
};
