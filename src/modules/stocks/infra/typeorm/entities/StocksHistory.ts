import { User } from "@modules/accounts/infra/typeorm/entities/User";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("stocks_history")
class StocksHistory {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  symbol: string;

  @Column()
  open: number;

  @Column()
  high: number;

  @Column()
  low: number;

  @Column()
  close: number;

  @CreateDateColumn()
  date: Date;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { StocksHistory };
