import { PartialType } from '@nestjs/swagger';
import { CheckoutDto } from './checkout.dto';


export class UpdateOrderDto extends PartialType(CheckoutDto) {}
