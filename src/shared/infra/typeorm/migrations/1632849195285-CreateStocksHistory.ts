import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateStocksHistory1632849195285 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "stocks_history",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "symbol",
            type: "varchar",
          },
          {
            name: "open",
            type: "decimal",
          },
          {
            name: "high",
            type: "decimal",
          },
          {
            name: "low",
            type: "decimal",
          },
          {
            name: "close",
            type: "decimal",
          },
          {
            name: "date",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "user_id",
            type: "uuid",
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: "FKUserStocksHistory",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["user_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("stocks_history");
  }
}
