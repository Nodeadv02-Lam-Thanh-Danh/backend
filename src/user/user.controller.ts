import {
  Controller,
  Get,
  Post,
  Body,
  ConflictException,
  UseGuards,
  ClassSerializerInterceptor,
  UseInterceptors,
  Patch,
  InternalServerErrorException,
  Query,
  Put,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/request/create-user.dto';
import { AuthGuard } from 'src/common/guards/auth.service';
import { User as RequestUser } from 'src/common/types/user.type';
import { User } from 'src/common/decorators/user.decorator';
import { OrderService } from 'src/order/order.service';
import { UpdateOrderDto } from './dto/request/update-order.dto';
import { MyOrderDto } from './dto/response/my-order.dto';
import { UserDto } from './dto/response/user.dto';
import { UpdateDto } from '../common/dtos/response/update';
import { UpdateCheckoutDto } from './dto/request/update-checkout.dto';
import { CheckoutDto } from './dto/response/checkout.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly orderService: OrderService,
  ) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    if (await this.userService.doesEmailExist(createUserDto.email)) {
      throw new ConflictException('Email already exists');
    } else if (
      await this.userService.doesUsernameExists(createUserDto.username)
    ) {
      throw new ConflictException('Username already exists');
    } else if (await this.userService.doesPhoneExist(createUserDto.phone)) {
      throw new ConflictException('Phone already exists');
    }

    return {
      user: await this.userService.create(createUserDto),
    };
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('profile')
  async profile(@User() user: RequestUser): Promise<UserDto> {
    const profile = await this.userService.findOne(user.id);
    return {
      user: profile,
    };
  }

  @UseGuards(AuthGuard)
  @Patch('order')
  async updateMyOrderDetails(
    @Body() updateOrderDto: UpdateOrderDto,
    @User() user: RequestUser,
  ): Promise<MyOrderDto> {
    try {
      const order = await this.orderService.addOrderDetails(
        user.id,
        updateOrderDto,
      );
      return { order: order };
    } catch (error) {
      throw new InternalServerErrorException('Failed to update order');
    }
  }

  @UseGuards(AuthGuard)
  @Get('order')
  async getMyOrder(
    @User() user: RequestUser,
    @Query('getCount') getCount: boolean,
  ): Promise<MyOrderDto> {
    try {
      const order = await this.orderService.getLastedNewOrder(
        user.id,
        getCount,
      );
      return { order: order };
    } catch (error) {
      throw new InternalServerErrorException('Failed to get order');
    }
  }

  @UseGuards(AuthGuard)
  @Delete('order/:foodId')
  async deleteMyOrderDetails(
    @Param('foodId', ParseIntPipe) foodId: number,
    @User() user: RequestUser,
  ): Promise<UpdateDto> {
    try {
      const result = await this.orderService.deleteOrderDetails(
        user.id,
		foodId
      );
      return { result: result };
    } catch (error) {
      throw new InternalServerErrorException('Failed to update order');
    }
  }

  @UseGuards(AuthGuard)
  @Post('checkouts')
  async createCheckOut(
	@User() user: RequestUser
  ): Promise<CheckoutDto> {
	try {
		const checkout = await this.orderService.createCheckout(user.id);
    	return { checkout: checkout };
	  } catch (error) {
		throw new InternalServerErrorException('Failed to order');
	  }
  }

  @UseGuards(AuthGuard)
  @Get('checkout')
  async getCheckout(
	@User() user: RequestUser
  ): Promise<CheckoutDto> {
	const order = await this.orderService.getLastedNewOrder(user.id, false);
	if (order) {
		const checkout = await this.orderService.getCheckoutByOrderId(order.id);
		return {
			checkout: checkout,
			order: order
		}
	}
  }

  @UseGuards(AuthGuard)
  @Patch('checkout')
  async updateCheckOut(
	@User() user: RequestUser,
	@Body() updateCheckoutDto: UpdateCheckoutDto
  ): Promise<UpdateDto> {
	try {
		const result = await this.orderService.updateCheckout(user.id, updateCheckoutDto);
    	return { result: result };
	  } catch (error) {
		throw new InternalServerErrorException('Failed to order');
	  }
  }
}
