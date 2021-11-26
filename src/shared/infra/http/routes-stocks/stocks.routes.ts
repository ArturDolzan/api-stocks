import { Router } from "express";
import { GetStockesController } from "@modules/stocks/useCases/getStocks/GetStockesController";

const stocksRoutes = Router();

const getStockesController = new GetStockesController();

stocksRoutes.get("/", getStockesController.handle);

export { stocksRoutes };
