import { IStatsDTO } from "../dtos/IStatsDTO";
import { IStocksByIdDTO } from "../dtos/IStocksByIdDTO";
import { IStockUserIdDTO } from "../dtos/IStockUserIdDTO";
import { StocksHistory } from "../infra/typeorm/entities/StocksHistory";

interface IStocksHistoryRepository {
  getAll(stocksByNameDTO: IStocksByIdDTO): Promise<StocksHistory[]>;
  create(data: IStockUserIdDTO): Promise<StocksHistory>;
  stats(): Promise<IStatsDTO[]>;
}

export { IStocksHistoryRepository };
