import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { CartService } from "./cart.service";
import { Req } from "@nestjs/common";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { AddToCartDto } from "./dto/create-cart.dto";
import { UpdateCartItemDto } from "./dto/update-cart.dto";

@ApiTags("Cart")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("cart")
export class CartController {
  constructor(private service: CartService) {}

  @Get()
  list(@Req() req: any) {
    return this.service.list(req.user.id);
  }

  @Post("items")
  add(@Req() req: any, @Body() dto: AddToCartDto) {
    return this.service.add(req.user.id, dto);
  }

  @Patch("items/:id")
  update(
    @Req() req: any,
    @Param("id") id: string,
    @Body() dto: UpdateCartItemDto,
  ) {
    return this.service.update(req.user.id, Number(id), dto);
  }

  @Delete("items/:id")
  remove(@Req() req: any, @Param("id") id: string) {
    return this.service.remove(req.user.id, Number(id));
  }
}
