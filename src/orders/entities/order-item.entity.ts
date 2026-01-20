import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Order } from "./order.entity";

@Entity("order_items")
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: number;

  @ManyToOne(() => Order, (o) => o.items, { onDelete: "CASCADE" })
  order: Order;

  @Column()
  productId: number;

  @Column()
  title: string;

  @Column({ type: "numeric", precision: 12, scale: 2 })
  price: number;

  @Column({ type: "int" })
  quantity: number;
}
