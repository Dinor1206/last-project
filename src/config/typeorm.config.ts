import { TypeOrmModuleOptions } from "@nestjs/typeorm";



export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host:"localhost",
  port: 5000,
  username: "postgres",
  password: "dinor",
  database: "test",
  autoLoadEntities:true,
  synchronize: true, 
};
