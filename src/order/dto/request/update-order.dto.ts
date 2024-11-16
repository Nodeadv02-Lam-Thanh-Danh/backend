import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, Min } from "class-validator";

export class UpdateOrderDto {
	@IsNotEmpty()
	@Type(() => Number)
	@IsInt()
	foodId: number;

	@IsNotEmpty()
	@Type(() => Number)
	@IsInt()
	@Min(1)
	quantity: number;
}