import { bannerService } from "./banner.service.js";

const createBanner = async (req, res) => {
  const bannerData = req.body;
  const result = await bannerService.createBanner(bannerData);
  res.send(result);
};

const getAllBanners = async (req, res) => {
  const result = await bannerService.getAllBanners();
  res.send(result);
};

const toggleBannerStatus = async (req, res) => {
  const id = req.params.id;
  const result = await bannerService.toggleBannerStatus(id);
  res.send(result);
};

const getActiveBanners = async (req, res) => {
  const result = await bannerService.getActiveBanners();
  res.send(result);
};

export const bannerController = {
  createBanner,
  getAllBanners,
  toggleBannerStatus,
  getActiveBanners,
};