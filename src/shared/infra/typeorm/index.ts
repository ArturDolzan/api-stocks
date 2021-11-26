import { Connection, createConnection, getConnectionOptions } from "typeorm";
import dotenv from "dotenv";
dotenv.config();

export default async (host = "database"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  const isTest = process.env.NODE_ENV === "test";

  return createConnection(
    Object.assign(defaultOptions, {
      host: isTest ? "localhost" : host,
      database: isTest ? "stocks_test" : defaultOptions.database,
    })
  );
};
