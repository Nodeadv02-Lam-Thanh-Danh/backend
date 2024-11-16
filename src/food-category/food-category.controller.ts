import { Controller, Get } from '@nestjs/common';
import { FoodCategoryService } from './food-category.service';
import { FoodCategoryDto } from './dto/response/food-category.dto';

@Controller('food-categories')
export class FoodCategoryController {
  constructor(private readonly foodCategoryService: FoodCategoryService) {}

  @Get()
  async getAll(): Promise<FoodCategoryDto> {
    const categories = await this.foodCategoryService.findAll();
    return {
      categories: categories
    };
  }
}
