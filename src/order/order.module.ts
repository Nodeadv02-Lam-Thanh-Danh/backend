import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FoodModule } from 'src/food/food.module';
import { FoodService } from 'src/food/food.service';

@Module({
  imports: [PrismaModule, FoodModule],
  providers: [OrderService, FoodService],
})
export class OrderModule {}
