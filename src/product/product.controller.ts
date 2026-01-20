import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ProductsService } from "./product.service";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";


@ApiTags("Products")
@Controller("products")
export class ProductsController {
  constructor(private service: ProductsService) {}

  @Get()
  @ApiOperation({ summary: "List products (pagination + search)" })
  findAll(
    @Query("search") search?: string,
    @Query("page") page?: string,
    @Query("limit") limit?: string,
  ) {
    return this.service.findAll({
      search,
      page: Number(page),
      limit: Number(limit),
    });
  }

  @Get(":id")
  @ApiOperation({ summary: "Get product by id" })
  findOne(@Param("id") id: string) {
    return this.service.findOne(Number(id));
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: "Create product (protected)" })
  create(@Body() dto: CreateProductDto) {
    return this.service.create(dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Update product (protected)" })
  update(@Param("id") id: string, @Body() dto: UpdateProductDto) {
    return this.service.update(Number(id), dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Delete product (protected)" })
  remove(@Param("id") id: string) {
    return this.service.remove(Number(id));
  }
}
