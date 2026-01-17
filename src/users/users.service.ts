import { Injectable } from "@nestjs/common";
import { User } from "../common/types/user.type";
import { CreateUserDto } from "./dto/create-user.dto";


@Injectable()
export class UsersService {
  private users: User[] = [];

  create(dto: CreateUserDto): User {
    const user: User = {
      id: Date.now(),
      email: dto.email,
      password: dto.password,
    };

    this.users.push(user);
    return user;
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((u) => u.email === email);
  }
}
