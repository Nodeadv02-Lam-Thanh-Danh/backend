import { Expose } from "class-transformer";

export class FoodCategory {
	@Expose()
	id: number;

	@Expose()
	name: string;

	@Expose()
	icon: string;
}