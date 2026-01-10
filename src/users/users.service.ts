import { Injectable } from "@nestjs/common";
import { User } from "./interface";


@Injectable()
export class UsersService {
  private users: User[] = [];

  create(user: User): User {
    this.users.push(user);
    return user;
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((u) => u.email === email);
  }
}
