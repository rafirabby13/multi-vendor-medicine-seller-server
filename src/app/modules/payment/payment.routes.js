
import express from 'express'
import { paymentController } from './payment.controller.js';
import { verifyAdmin, verifySeller, verifyToken } from '../../middlewares/auth.js';
const router = express.Router();

router.post("/create-payment-intent", paymentController.createPaymentIntent);
router.post("/", paymentController.createPayment);
router.get("/seller", verifyToken, verifySeller, paymentController.getSellerPayments);
router.patch("/accept-payment/:id", verifyToken, verifyAdmin, paymentController.acceptPayment);
router.get("/total-payment-paid", verifyToken, verifyAdmin, paymentController.getTotalPaymentsPaid);

export const paymentRoutes = router;