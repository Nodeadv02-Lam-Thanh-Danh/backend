import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User as RequestUser } from '../types/user.type';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (typeof request.user !== 'undefined') {
      const user: RequestUser = {
        id: request.user.id,
        email: request.user.email,
      };
      return user;
    }
    return undefined;
  },
);
