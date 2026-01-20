import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsObject, IsOptional, IsString } from "class-validator";

export class CheckoutDto {
  @ApiProperty()
  @IsObject()
  shippingAddress: {
    fullName: string;
    phone: string;
    city: string;
    addressLine: string;
    note?: string;
  };

  @ApiProperty({ enum: ["COD", "CARD"], default: "COD" })
  @IsIn(["COD", "CARD"])
  paymentMethod: "COD" | "CARD";

  @ApiProperty({ enum: ["STANDARD", "EXPRESS"], default: "STANDARD" })
  @IsIn(["STANDARD", "EXPRESS"])
  deliveryMethod: "STANDARD" | "EXPRESS";

  @ApiProperty({ required: false, example: "Please call before delivery" })
  @IsOptional()
  @IsString()
  note?: string;
}
