
import express from 'express'
import { companyController } from './company.controller.js';
const router = express.Router();

router.get("/", companyController.getAllCompanies);


export const companyRoutes = router;