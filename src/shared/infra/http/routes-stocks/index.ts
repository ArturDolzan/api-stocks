import { Router } from "express";

import { stocksRoutes } from "./stocks.routes";

const router = Router();

router.use("/servicestock", stocksRoutes);

export { router };
