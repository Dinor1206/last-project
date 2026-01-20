import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UsersService } from "../users/users.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const exists = await this.usersService.findByEmail(dto.email);
    if (exists) {
      throw new BadRequestException("Email already exists");
    }

    if (!dto?.password) {
      throw new BadRequestException("Password required");
    }

    const hashed = await bcrypt.hash(dto.password, 10);

    const user = await this.usersService.create({
      email: dto.email,
      password: hashed,
    });

    return {
      id: user.id,
      email: user.email,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException("User not found");

    if (!dto?.password) throw new UnauthorizedException("Password required");

    const match = await bcrypt.compare(dto.password, user.password);
    if (!match) throw new UnauthorizedException("Wrong password");

    const payload = { sub: user.id, email: user.email };

    return { accessToken: this.jwtService.sign(payload) };
  }
}
