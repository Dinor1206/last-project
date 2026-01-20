import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

export class CreateProductDto {
  @ApiProperty({ example: "iPhone 15 Pro" })
  @IsString()
  @MaxLength(200)
  title: string;

  @ApiProperty({ example: "Yangi, kafolat bilan", required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 1299.99 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: "https://img...", required: false })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
