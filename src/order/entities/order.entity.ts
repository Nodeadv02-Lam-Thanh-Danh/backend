import { Expose, Transform, Type } from 'class-transformer';

class Restaurant {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  address: string;
}

export class Food {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  restaurant: Restaurant;

  @Expose()
  @Type(() => String)
  image: string[];

  @Expose()
  price: number;
}

export class OrderDetail {
  @Expose()
  foodId: number;

  @Expose()
  @Type(() => Food)
  food?: Food;

  @Expose()
  quantity: number;
}

export class Order {
  @Expose({ groups: ['count', 'details'] })
  id: number;

  @Expose({ groups: ['details'] })
  @Type(() => OrderDetail)
  details: OrderDetail[];

  @Expose({ groups: ['count'] })
  count: number;
}
