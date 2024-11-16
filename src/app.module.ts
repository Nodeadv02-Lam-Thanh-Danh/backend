import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { LoginModule } from './login/login.module';
import { FoodCategoryModule } from './food-category/food-category.module';
import { FoodModule } from './food/food.module';
import { OrderModule } from './order/order.module';
import { CheckoutModule } from './checkout/checkout.module';

@Module({
  imports: [UserModule, PrismaModule, LoginModule, FoodCategoryModule, FoodModule, OrderModule, CheckoutModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
