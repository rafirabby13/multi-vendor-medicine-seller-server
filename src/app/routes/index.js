import { Router } from "express"
import { cartRoutes } from "../modules/cart/cart.routes.js";
import { paymentRoutes } from "../modules/payment/payment.routes.js";
import { userRoutes } from "../modules/user/user.routes.js";
import { bannerRoutes } from "../modules/banner/banner.routes.js";
import { categoryRoutes } from "../modules/medicineCategory/category.routes.js";
import { shopRoutes } from "../modules/shop/shop.routes.js";
import { companyRoutes } from "../modules/company/company.routes.js";

export const router = Router();

const moduleRoutes = [
  {
    path: "/payment",
    route: paymentRoutes,
  },
  {
    path: "/cart",
    route: cartRoutes,
  },
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/banner",
    route: bannerRoutes,
  },
  {
    path: "/category",
    route: categoryRoutes,
  },
  {
    path: "/shop",
    route: shopRoutes,
  },
  {
    path: "/company",
    route: companyRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
// export default router;