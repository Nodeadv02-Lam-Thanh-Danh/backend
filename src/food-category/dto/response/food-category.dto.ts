import { Expose } from "class-transformer";
import { FoodCategory } from "src/food-category/entities/food-category.entity";

export class FoodCategoryDto {
	categories: FoodCategory[];
}