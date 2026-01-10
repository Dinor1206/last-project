import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UsersService } from "../users/users.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async register(dto: RegisterDto) {
    const hashed = await bcrypt.hash(dto.password, 10);

    const user = this.usersService.create({
      email: dto.email,
      password: hashed,
    });

    return user;
  }

  async login(dto: LoginDto) {
    const user = this.usersService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException("User not found");

    const match = await bcrypt.compare(dto.password, user.password);
    if (!match) throw new UnauthorizedException();

    const payload = { email: user.email };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
