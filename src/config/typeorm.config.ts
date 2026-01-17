import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";


export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host:"localhost",
  port: 5000,
  username: "postgres",
  password: "dinor",
  database: "exam",
  entities: [User],
  synchronize: true, 
};
