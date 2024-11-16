import { Expose } from "class-transformer";
import { Food } from "src/food/entities/food.entity";

export class FoodsDto {
	@Expose()
	foods: Food[];
}

export class FoodDto {
	@Expose()
	food: Food;
}