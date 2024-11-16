import { Expose } from 'class-transformer';

export class Checkout {
  @Expose()
  order_id: number;

  @Expose()
  shipping_method: number;

  @Expose()
  payment_method: number;

  @Expose()
  shipping_address: number;

  @Expose()
  total_price: number;
}
