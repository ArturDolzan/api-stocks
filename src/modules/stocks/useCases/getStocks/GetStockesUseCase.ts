import axios from "axios";

import { IStockDTO } from "@modules/stocks/dtos/IStockDTO";

interface IRequest {
  id: string;
}

class GetStockesUseCase {
  async execute({ id }: IRequest): Promise<IStockDTO> {
    const { data } = await axios.get(
      `https://stooq.com/q/l/?s=${id}&f=sd2t2ohlcvn&h&e=json`,
      { proxy: false }
    );

    const stock = { ...data.symbols[0] };

    if (!stock.name) {
      return null;
    }

    return {
      name: stock.name,
      symbol: stock.symbol,
      open: stock.open,
      high: stock.high,
      low: stock.low,
      close: stock.close,
    };
  }
}

export { GetStockesUseCase };
