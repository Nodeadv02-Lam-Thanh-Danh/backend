import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OrderModule } from 'src/order/order.module';
import { OrderService } from 'src/order/order.service';
import { FoodModule } from 'src/food/food.module';
import { FoodService } from 'src/food/food.service';

@Module({
  imports: [PrismaModule, OrderModule, FoodModule],
  controllers: [UserController],
  providers: [UserService, OrderService, FoodService],
})
export class UserModule {}
