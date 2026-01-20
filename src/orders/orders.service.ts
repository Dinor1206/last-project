import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CheckoutDto } from "./dto/checkout.dto";
import { Order } from "./entities/order.entity";
import { OrderItem } from "./entities/order-item.entity";
import { CartItem } from "src/cart/entities/cart.entity";

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepo: Repository<Order>,
    @InjectRepository(OrderItem) private itemsRepo: Repository<OrderItem>,
    @InjectRepository(CartItem) private cartRepo: Repository<CartItem>,
  ) {}

  async checkout(userId: number, dto: CheckoutDto) {
    const cart = await this.cartRepo.find({
      where: { userId },
      order: { createdAt: "DESC" },
    });
    if (cart.length === 0) throw new BadRequestException("Cart is empty");

    // total
    const total = cart.reduce(
      (sum, ci) => sum + Number(ci.product.price) * ci.quantity,
      0,
    );

    const order = await this.ordersRepo.save(
      this.ordersRepo.create({
        userId,
        total,
        shippingAddress: dto.shippingAddress,
        paymentMethod: dto.paymentMethod,
        deliveryMethod: dto.deliveryMethod,
        status: "PENDING",
      }),
    );

    const items = cart.map((ci) =>
      this.itemsRepo.create({
        orderId: order.id,
        productId: ci.productId,
        title: ci.product.title,
        price: ci.product.price,
        quantity: ci.quantity,
      }),
    );
    await this.itemsRepo.save(items);

    await this.cartRepo.delete({ userId });

    return this.ordersRepo.findOne({
      where: { id: order.id },
      relations: { items: true },
    });
  }

  myOrders(userId: number) {
    return this.ordersRepo.find({
      where: { userId },
      order: { createdAt: "DESC" },
      relations: { items: true },
    });
  }

  async detail(userId: number, id: number) {
    const order = await this.ordersRepo.findOne({
      where: { id, userId },
      relations: { items: true },
    });
    if (!order) throw new NotFoundException("Order not found");
    return order;
  }
}
