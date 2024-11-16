import { Food } from "src/food/entities/food.entity";

export interface OrderDetails {
  foodId: number;
  quantity: number;
  food?: Food;
}
