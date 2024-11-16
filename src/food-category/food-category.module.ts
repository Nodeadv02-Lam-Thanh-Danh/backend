import { Module } from '@nestjs/common';
import { FoodCategoryService } from './food-category.service';
import { FoodCategoryController } from './food-category.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FoodCategoryController],
  providers: [FoodCategoryService],
})
export class FoodCategoryModule {}
