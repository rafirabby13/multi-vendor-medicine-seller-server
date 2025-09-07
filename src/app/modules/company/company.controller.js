import { companyService } from "./company.service.js";

const getAllCompanies = async (req, res) => {
  const result = await companyService.getAllCompanies();
  res.send(result);
};

export const companyController = {
  getAllCompanies,
};