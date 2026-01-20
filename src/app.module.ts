import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { OrdersModule } from './orders/orders.module';
import { CartModule } from './cart/cart.module';




@Module({
  imports: [ConfigModule.forRoot({isGlobal:true,
    envFilePath:".env",
  }),
    TypeOrmModule.forRoot(typeOrmConfig),
  AuthModule, UsersModule, ProductsModule, CartModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
