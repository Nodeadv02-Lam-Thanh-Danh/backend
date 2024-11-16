import { Expose, Transform } from 'class-transformer';

class Restaurant {
  @Expose()
  name: string;

  @Expose()
  address: string;

  @Expose()
  businessHours: string;
}

export class Food {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  restaurant: Restaurant;

  @Transform(({ value }) => value.map(v => v.url))
  @Expose()
  image: string[];

  @Expose()
  price: number;
}
