import {
  Controller,
  DefaultValuePipe,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodDto, FoodsDto } from './dto/response/food.dto';

@Controller('foods')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Get('/')
  async getAllToday(
    @Query(
      'categoryId',
      new DefaultValuePipe(0),
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    categoryId: number,
    @Query('search', new DefaultValuePipe('')) search: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<FoodsDto> {
    const foods = await this.foodService.findAllToday(
      categoryId,
      search,
      page,
      limit,
    );

    return { foods: foods };
  }

  @Get('/:id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<FoodDto> {
    const food = await this.foodService.findById(id);

    return { food: food };
  }
}
