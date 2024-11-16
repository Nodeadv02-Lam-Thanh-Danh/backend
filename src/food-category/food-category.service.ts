import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { FoodCategory } from './entities/food-category.entity';

@Injectable()
export class FoodCategoryService {
  constructor(private readonly prismaClient: PrismaClient) {}

  async findAll() : Promise<FoodCategory[]> {
	return await this.prismaClient.food_category.findMany();
  }
}
