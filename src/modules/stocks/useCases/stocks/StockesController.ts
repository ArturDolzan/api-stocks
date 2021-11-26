import { Request, Response } from "express";
import { container } from "tsyringe";

import { StockesUseCase } from "./StockesUseCase";

class StockesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { q } = request.query;
    const { id } = request.user;

    const stockesUseCase = container.resolve(StockesUseCase);

    const data = await stockesUseCase.execute({ id: q, idUser: id });

    return response.status(200).json(data);
  }
}

export { StockesController };
