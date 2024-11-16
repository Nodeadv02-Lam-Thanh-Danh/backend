import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Order } from './entities/order.entity';
import { FoodService } from 'src/food/food.service';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { UpdateOrderDto } from './dto/request/update-order.dto';
import { OrderDetails } from 'src/common/types/order-details.type';
import { UpdateCheckoutDto } from 'src/user/dto/request/update-checkout.dto';
import { Checkout } from 'src/checkout/entities/checkout..entity';

@Injectable()
export class OrderService {
  constructor(
    private readonly prismaClient: PrismaClient,
    private readonly foodService: FoodService,
  ) {}

  async getNewOrderByUserId(userId: number): Promise<any> {
    const order = await this.prismaClient.order.findFirst({
      where: {
        userId: userId,
        status: 'new',
      },
      orderBy: {
        id: 'desc',
      },
    });

    return order;
  }

  async getToTotalPrice(details: OrderDetails[]): Promise<number> {
    let totalPrice = 0;
    const foods = await this.prismaClient.food.findMany({
      where: {
        id: {
          in: details.map((detail) => detail.foodId),
        },
      },
      select: {
        id: true,
        price: true,
      },
    });

    for (const { foodId, quantity } of details) {
      const food = foods.find((food) => food.id === foodId);
      if (food) {
        totalPrice += food.price * quantity;
      }
    }

    return totalPrice;
  }

  async getLastedNewOrder(
    userId: number,
    getCount: boolean = false,
  ): Promise<Order | null> {
    const order = await this.getNewOrderByUserId(userId);

    if (!order || !Array.isArray(order.details)) {
      return null;
    }

    const details = order.details as unknown as OrderDetails[];
    if (getCount) {
      return plainToInstance(
        Order,
        {
          id: order.id,
          count: order.details.length,
        },
        { groups: ['count'], excludeExtraneousValues: true },
      );
    }

    const foodIds = details.map((detail) => detail.foodId);
    const foods = await this.foodService.findByIds(foodIds);
    details.forEach((detail) => {
      const food = foods.find((food) => food.id === detail.foodId);
      if (food) {
        detail.food = food;
      }
    });

    return plainToInstance(Order, order, {
      groups: ['details'],
      excludeExtraneousValues: true,
    });
  }

  async addOrderDetails(
    userId: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    let order = await this.getNewOrderByUserId(userId);

    let details = [];
    if (order && Array.isArray(order.details)) {
      details = order.details as unknown as OrderDetails[];
      const detail = details.find((v) => v.foodId === updateOrderDto.foodId);
      if (detail) {
        detail.quantity += updateOrderDto.quantity;
      } else {
        details.push({
          quantity: updateOrderDto.quantity,
          foodId: updateOrderDto.foodId,
        });
      }
    } else {
      const detail: OrderDetails = {
        quantity: updateOrderDto.quantity,
        foodId: updateOrderDto.foodId,
      };
      details.push(detail);
    }

    const food = await this.prismaClient.food.findUnique({
      where: {
        id: updateOrderDto.foodId,
      },
    });

    if (food.quantity_remained < updateOrderDto.quantity) {
      throw new Error(`Not enough quantity of food`);
    }

    let newOrderId: number = 0;
    if (order) {
      try {
        const result = await this.prismaClient.order.update({
          where: {
            id: order.id,
          },
          data: {
            details: instanceToPlain(details),
          },
        });
        if (!result) {
          throw new Error(`Failed to create order`);
        }

        newOrderId = order.id;
      } catch (error) {
        throw error;
      }
    } else {
      try {
        order = await this.prismaClient.order.create({
          data: {
            userId: userId,
            details: instanceToPlain(details),
          },
        });

        if (!order) {
          throw new Error(`Failed to create order`);
        }

        newOrderId = order.id;
      } catch (error) {
        throw error;
      }
    }

    return plainToInstance(
      Order,
      {
        id: newOrderId,
        count: details.length,
      },
      { groups: ['count'], excludeExtraneousValues: true },
    );
  }

  async deleteOrderDetails(userId: number, foodId: number): Promise<boolean> {
    const order = await this.getNewOrderByUserId(userId);

    if (!order || !Array.isArray(order.details)) {
      return null;
    }

    let details = order.details as unknown as OrderDetails[];
    details = details.filter((v) => v.foodId !== foodId);
    const result = await this.prismaClient.order.update({
      where: {
        id: order.id,
      },
      data: {
        details: instanceToPlain(details),
      },
    });

    if (!result) {
      throw new Error(`Failed to update order`);
    }

    return true;
  }

  async createCheckout(userId: number): Promise<Checkout | null> {
    const order = await this.getNewOrderByUserId(userId);
    if (!order || !Array.isArray(order.details)) {
      return null;
    }

    const details = order.details as unknown as OrderDetails[];
    const totalPrice = await this.getToTotalPrice(details);

    const existedcheckout = await this.prismaClient.checkout.findFirst({
      where: {
        order_id: order.id,
      },
    });

    let checkout = null;
    if (existedcheckout) {
      checkout = await this.prismaClient.checkout.update({
        where: {
          id: existedcheckout.id,
        },
        data: {
          total_price: totalPrice,
        },
      });

      if (!checkout) {
        return null;
      }
    } else {
      checkout = await this.prismaClient.checkout.create({
        data: {
          order_id: order.id,
          shipping_method: 1,
          payment_method: 1,
          shipping_address: 1,
          total_price: totalPrice,
          status: 'new',
        },
      });

      if (!checkout) {
        return null;
      }
    }

    return plainToInstance(Checkout, checkout, {
      excludeExtraneousValues: true,
    });
  }

  async getCheckoutByOrderId(orderId: number): Promise<Checkout | null> {
    const checkout = await this.prismaClient.checkout.findFirst({
      where: {
        order_id: orderId,
      },
    });

    if (!checkout) {
      return null;
    }

    return plainToInstance(Checkout, checkout, {
      excludeExtraneousValues: true,
    });
  }

  async updateCheckout(
    userId: number,
    updateCheckoutDto: UpdateCheckoutDto,
  ): Promise<boolean> {
    const order = await this.getNewOrderByUserId(userId);
    if (!order || !Array.isArray(order.details)) {
      return false;
    }

    const details = order.details as unknown as OrderDetails[];
    const checkout = await this.prismaClient.checkout.findFirst({
      where: {
        order_id: order.id,
      },
    });

    if (!checkout) {
      throw new Error(`Failed to checkout order`);
    }

    await this.prismaClient.$transaction(async (prisma: PrismaClient) => {
      try {
        const result = await prisma.checkout.update({
          where: {
            id: checkout.id,
          },
          data: { ...updateCheckoutDto },
        });

        if (!result) {
          throw new Error(`Failed to checkout order`);
        }
      } catch (error) {
        throw error;
      }

      if (updateCheckoutDto.status === 'ordered') {
        for (const { foodId, quantity } of details) {
          try {
            const result = await prisma.food.update({
              where: {
                id: foodId,
              },
              data: {
                quantity_remained: {
                  decrement: quantity,
                },
              },
            });
            if (!result) {
              throw new Error(`Failed to create order`);
            }
          } catch (error) {
            throw error;
          }
        }

        try {
          const result = await prisma.order.update({
            where: {
              id: order.id,
            },
            data: {
              status: 'ordered',
            },
          });
          if (!result) {
            throw new Error(`Failed to checkout order`);
          }
        } catch (error) {
          throw error;
        }
      }
    });

    return true;
  }
}
