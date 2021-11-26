import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { passwordRoutes } from "./password.routes";
import { usersRoutes } from "./users.routes";
import { stocksRoutes } from "./stocks.routes";

const router = Router();

router.use("/register", usersRoutes);
router.use("/password", passwordRoutes);
router.use("/", stocksRoutes);
router.use(authenticateRoutes);

export { router };
