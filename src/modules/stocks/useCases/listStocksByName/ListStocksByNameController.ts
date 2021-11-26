import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListStocksByNameUseCase } from "./ListStocksByNameUseCase";

class ListStocksByNameController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listStocksByNameUseCase = container.resolve(ListStocksByNameUseCase);

    const list = await listStocksByNameUseCase.execute({ id });

    return response.status(200).json(list);
  }
}

export { ListStocksByNameController };
