import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty({ example: "dinoraromonberganova@mail.com" })
  email: string;

  @ApiProperty({ example: "123456" })
  password: string;
}
