import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from "class-validator";

class ItemDto {
	@IsNotEmpty()
	@IsNumber()
	foodId: number;

	@IsNotEmpty()
	@IsNumber()
	quantity: number;
}

export class CreateOrderDto {
	@IsNotEmpty()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => ItemDto)
	details: ItemDto[]
}