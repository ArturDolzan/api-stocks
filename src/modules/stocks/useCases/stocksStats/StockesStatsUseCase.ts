import { inject, injectable } from "tsyringe";
import { IStocksHistoryRepository } from "@modules/stocks/repositories/IStocksHistoryRepository";
import { IStatsDTO } from "@modules/stocks/dtos/IStatsDTO";

@injectable()
class StockesStatsUseCase {
  constructor(
    @inject("StocksHistoryRepository")
    private stocksHistoryRepository: IStocksHistoryRepository
  ) {}
  async execute(): Promise<IStatsDTO[]> {
    const data = this.stocksHistoryRepository.stats();

    return data;
  }
}

export { StockesStatsUseCase };
