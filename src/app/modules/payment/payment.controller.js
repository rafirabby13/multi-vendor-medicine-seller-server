import { paymentService } from "./payment.service.js";

const createPaymentIntent = async (req, res) => {
  const { price } = req.body;
  const result = await paymentService.createPaymentIntent(price);
  res.send(result);
};

const createPayment = async (req, res) => {
  const payment = req.body;
  const result = await paymentService.createPayment(payment);
  res.send(result);
};

const getSellerPayments = async (req, res) => {
  const email = req.query.email;
  const result = await paymentService.getSellerPayments(email);
  res.send(result);
};

const acceptPayment = async (req, res) => {
  const id = req.params.id;
  const result = await paymentService.acceptPayment(id);
  res.send(result);
};

const getTotalPaymentsPaid = async (req, res) => {
  const result = await paymentService.getAllPayments();
  res.send(result);
};

export const paymentController = {
  createPaymentIntent,
  createPayment,
  getSellerPayments,
  acceptPayment,
  getTotalPaymentsPaid,
};