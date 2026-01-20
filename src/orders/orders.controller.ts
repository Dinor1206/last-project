import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { CheckoutDto } from "./dto/checkout.dto";
import { OrdersService } from "./orders.service";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";

@ApiTags("Orders")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("orders")
export class OrdersController {
  constructor(private service: OrdersService) {}

  @Post("checkout")
  checkout(@Req() req: any, @Body() dto: CheckoutDto) {
    return this.service.checkout(req.user.id, dto);
  }

  @Get("my")
  my(@Req() req: any) {
    return this.service.myOrders(req.user.id);
  }

  @Get(":id")
  detail(@Req() req: any, @Param("id") id: string) {
    return this.service.detail(req.user.id, Number(id));
  }
}
