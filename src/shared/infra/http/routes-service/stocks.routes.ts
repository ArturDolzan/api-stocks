import { Router } from "express";
import { ListStocksByNameController } from "@modules/stocks/useCases/listStocksByName/ListStocksByNameController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { StockesController } from "@modules/stocks/useCases/stocks/StockesController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { StockesStatsController } from "@modules/stocks/useCases/stocksStats/StockesStatsController";

const stocksRoutes = Router();

const listStocksByNameController = new ListStocksByNameController();
const stockesController = new StockesController();
const stockesStatsController = new StockesStatsController();

stocksRoutes.get(
  "/history",
  ensureAuthenticated,
  listStocksByNameController.handle
);

stocksRoutes.get("/stock", ensureAuthenticated, stockesController.handle);

stocksRoutes.get(
  "/stats",
  ensureAuthenticated,
  ensureAdmin,
  stockesStatsController.handle
);

export { stocksRoutes };
