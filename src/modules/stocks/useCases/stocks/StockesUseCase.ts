import axios from "axios";

import { IStockDTO } from "@modules/stocks/dtos/IStockDTO";
import { inject, injectable } from "tsyringe";
import { IStocksHistoryRepository } from "@modules/stocks/repositories/IStocksHistoryRepository";

interface IRequest {
  id: string;
  idUser: string;
}

@injectable()
class StockesUseCase {
  constructor(
    @inject("StocksHistoryRepository")
    private stocksHistoryRepository: IStocksHistoryRepository
  ) {}
  async execute({ id, idUser }: IRequest): Promise<IStockDTO> {
    const { data } = await axios.get(
      `http://api-stocks:3334/servicestock?q=${id}`,
      {
        proxy: false,
      }
    );

    const { name, symbol, open, high, low, close } = data;

    this.stocksHistoryRepository.create({
      name,
      symbol,
      open,
      high,
      low,
      close,
      user_id: idUser,
    });

    return data;
  }
}

export { StockesUseCase };
