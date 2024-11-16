import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Food } from './entities/food.entity';
import * as moment from 'moment-timezone';
import { plainToInstance } from 'class-transformer';

type SearchClause = {
  name?: SearchName;
};

type SearchName = {
  contains: string;
  mode: 'insensitive';
};

@Injectable()
export class FoodService {
  constructor(readonly prismaClient: PrismaClient) {}

  async findAllToday(
    categoryId: number,
    search: string,
    page: number,
    limit: number,
  ): Promise<Food[]> {
    const today = moment().tz('Asia/Ho_Chi_Minh');
    const categoryClause = {
      ...(categoryId ? { categoryId: categoryId } : {}),
    };

    const searchClause: SearchClause = search.length
      ? {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        }
      : {};

    const foods = await this.prismaClient.food.findMany({
      where: {
        AND: [
          categoryClause,
          searchClause,
          { OR: [{ sale_daily: true }, { sale_date: today.toDate() }] },
        ],
      },
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        name: true,
        restaurant: {
          select: {
            name: true,
            address: true,
          },
        },
        image: {
          select: {
            url: true,
          },
        },
        price: true,
      },
    });

    return plainToInstance(Food, foods, { excludeExtraneousValues: true });
  }

  async findByIds(ids: number[]): Promise<Food[]> {
    const foods = await this.prismaClient.food.findMany({
      where: {
        id: { in: ids },
      },
      select: {
        id: true,
        name: true,
        restaurant: {
          select: {
            id: true,
            name: true,
            address: true,
          },
        },
        image: {
          select: {
            url: true,
          },
        },
        price: true,
      },
    });

    return plainToInstance(Food, foods, { excludeExtraneousValues: true });
  }

  async findById(foodId: number): Promise<Food | null> {
    const food = await this.prismaClient.food.findUnique({
      where: {
        id: foodId,
      },
      select: {
        id: true,
        name: true,
        restaurant: {
          select: {
            id: true,
            name: true,
            address: true,
			business_hours: true,
          },
        },
        image: {
          select: {
            url: true,
          },
        },
        price: true,
      },
    });

    if (!food) {
      return null;
    }

    return plainToInstance(Food, food, { excludeExtraneousValues: true });
  }
}
