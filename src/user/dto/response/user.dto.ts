import { Type } from 'class-transformer';
import { User } from 'src/user/entities/user.entity';

export class UserDto {
  @Type(() => User)
  user: User;

  token?: string;
}
