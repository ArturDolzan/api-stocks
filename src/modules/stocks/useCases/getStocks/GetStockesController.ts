import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetStockesUseCase } from "./GetStockesUseCase";

class GetStockesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { q } = request.query;

    const getStockesUseCase = container.resolve(GetStockesUseCase);

    const data = await getStockesUseCase.execute({ id: q });

    return response.status(200).json(data);
  }
}

export { GetStockesController };
