import { getRepository, Repository } from "typeorm";
import { IStocksHistoryRepository } from "@modules/stocks/repositories/IStocksHistoryRepository";
import { StocksHistory } from "../entities/StocksHistory";
import { IStocksByIdDTO } from "@modules/stocks/dtos/IStocksByIdDTO";
import { IStockUserIdDTO } from "@modules/stocks/dtos/IStockUserIdDTO";
import { IStatsDTO } from "@modules/stocks/dtos/IStatsDTO";

class StocksHistoryRepository implements IStocksHistoryRepository {
  private repository: Repository<StocksHistory>;

  constructor() {
    this.repository = getRepository(StocksHistory);
  }

  async getAll(stocksByIdDTO: IStocksByIdDTO): Promise<StocksHistory[]> {
    const list = await this.repository.find({
      where: { user: { id: stocksByIdDTO.id } },
    });

    return list;
  }

  async create({
    name,
    symbol,
    open,
    high,
    low,
    close,
    user_id,
  }: IStockUserIdDTO): Promise<StocksHistory> {
    const stock = this.repository.create({
      name,
      symbol,
      open,
      high,
      low,
      close,
      user_id,
    });

    await this.repository.save(stock);

    return stock;
  }

  async stats(): Promise<IStatsDTO[]> {
    const data = await this.repository.query(
      "select symbol as stocks, count(*) as times_requested from stocks_history t group by t.symbol"
    );

    return data;
  }
}

export { StocksHistoryRepository };
