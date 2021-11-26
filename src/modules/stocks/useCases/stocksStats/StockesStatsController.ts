import { Request, Response } from "express";
import { container } from "tsyringe";

import { StockesStatsUseCase } from "./StockesStatsUseCase";

class StockesStatsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const stockesStatsUseCase = container.resolve(StockesStatsUseCase);

    const data = await stockesStatsUseCase.execute();

    return response.status(200).json(data);
  }
}

export { StockesStatsController };
