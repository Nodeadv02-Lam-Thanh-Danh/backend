import { Exclude } from 'class-transformer';

export class User {
  @Exclude()
  password: string;
}
