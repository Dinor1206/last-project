import { TypeOrmModuleOptions } from "@nestjs/typeorm";



export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host:"localhost",
  port: 5000,
  username: "postgres",
  password: "dinor",
  database: "exam",
  autoLoadEntities:true,
  synchronize: true, 
};
