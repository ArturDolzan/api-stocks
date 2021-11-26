import { inject, injectable } from "tsyringe";

import { IStocksHistoryRepository } from "@modules/stocks/repositories/IStocksHistoryRepository";
import { StocksHistory } from "@modules/stocks/infra/typeorm/entities/StocksHistory";

interface IRequest {
  id: string;
}

@injectable()
class ListStocksByNameUseCase {
  constructor(
    @inject("StocksHistoryRepository")
    private stocksHistoryRepository: IStocksHistoryRepository
  ) {}

  async execute({ id }: IRequest): Promise<StocksHistory[]> {
    const list = await this.stocksHistoryRepository.getAll({ id });

    return list;
  }
}

export { ListStocksByNameUseCase };
