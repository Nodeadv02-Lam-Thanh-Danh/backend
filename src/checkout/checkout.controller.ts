import { Controller, Get, UseGuards } from '@nestjs/common';
import { CheckoutService } from './checkout.service';

@Controller('checkout')
export class CheckoutController {
	constructor(
		private readonly checkoutService: CheckoutService
	) {}
}
