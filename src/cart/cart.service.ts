import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CartItem } from "./entities/cart.entity";
import { AddToCartDto } from "./dto/create-cart.dto";
import { UpdateCartItemDto } from "./dto/update-cart.dto";


@Injectable()
export class CartService {
  constructor(@InjectRepository(CartItem) private repo: Repository<CartItem>) {}

  list(userId: number) {
    return this.repo.find({ where: { userId }, order: { createdAt: "DESC" } });
  }

  async add(userId: number, dto: AddToCartDto) {
    const existing = await this.repo.findOne({
      where: { userId, productId: dto.productId },
    });
    if (existing) {
      existing.quantity += dto.quantity;
      return this.repo.save(existing);
    }
    return this.repo.save(
      this.repo.create({
        userId,
        productId: dto.productId,
        quantity: dto.quantity,
      }),
    );
  }

  async update(userId: number, id: number, dto: UpdateCartItemDto) {
    const item = await this.repo.findOne({ where: { id, userId } });
    if (!item) throw new NotFoundException("Cart item not found");
    item.quantity = dto.quantity;
    return this.repo.save(item);
  }

  async remove(userId: number, id: number) {
    const item = await this.repo.findOne({ where: { id, userId } });
    if (!item) throw new NotFoundException("Cart item not found");
    await this.repo.remove(item);
    return { message: "Removed" };
  }

  async clear(userId: number) {
    await this.repo.delete({ userId });
  }
}
