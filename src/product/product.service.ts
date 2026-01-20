import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, ILike } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Product } from "./entities/product.entity";

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

  create(dto: CreateProductDto) {
    const product = this.repo.create(dto);
    return this.repo.save(product);
  }

  async update(id: number, dto: UpdateProductDto) {
    const product = await this.repo.findOne({ where: { id } });
    if (!product) throw new NotFoundException("Product not found");
    Object.assign(product, dto);
    return this.repo.save(product);
  }

  async remove(id: number) {
    const product = await this.repo.findOne({ where: { id } });
    if (!product) throw new NotFoundException("Product not found");
    await this.repo.remove(product);
    return { message: "Deleted" };
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async findAll(query: { search?: string; page?: number; limit?: number }) {
    const page = Math.max(1, Number(query.page || 1));
    const limit = Math.min(50, Math.max(1, Number(query.limit || 10)));
    const skip = (page - 1) * limit;

    const where = query.search ? { title: ILike(`%${query.search}%`) } : {};

    const [items, total] = await this.repo.findAndCount({
      where,
      order: { createdAt: "DESC" },
      take: limit,
      skip,
    });

    return {
      items,
      meta: { total, page, limit, pages: Math.ceil(total / limit) },
    };
  }
}
