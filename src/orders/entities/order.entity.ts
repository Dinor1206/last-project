import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from "typeorm";
import { OrderItem } from "./order-item.entity";


export type OrderStatus = "PENDING" | "PAID" | "CANCELLED";

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ type: "varchar", default: "PENDING" })
  status: OrderStatus;

  @Column({ type: "numeric", precision: 12, scale: 2 })
  total: number;

  // Step1: address (MVPda JSON)
  @Column({ type: "jsonb" })
  shippingAddress: {
    fullName: string;
    phone: string;
    city: string;
    addressLine: string;
    note?: string;
  };

  // Step2: payment + delivery
  @Column({ type: "varchar", default: "COD" })
  paymentMethod: "COD" | "CARD";

  @Column({ type: "varchar", default: "STANDARD" })
  deliveryMethod: "STANDARD" | "EXPRESS";

  @OneToMany(() => OrderItem, (i) => i.order, { cascade: true })
  items: OrderItem[];

  @CreateDateColumn()
  createdAt: Date;
}
