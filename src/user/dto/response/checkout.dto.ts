import { Type } from "class-transformer";
import { Checkout } from "src/checkout/entities/checkout..entity";
import { Order } from "src/order/entities/order.entity";

export class CheckoutDto {
	@Type(() => Checkout)
	checkout: Checkout;

	@Type(() => Order)
	order?: Order
}