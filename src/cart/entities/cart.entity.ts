import { Product } from "src/product/entities/product.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from "typeorm";


@Entity("cart_items")
@Unique(["userId", "productId"])
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  productId: number;



  @ManyToOne(() => Product, { eager: true, onDelete: "CASCADE" })
  product: Product;

  @Column({ type: "int", default: 1 })
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
