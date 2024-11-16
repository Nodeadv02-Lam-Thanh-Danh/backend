import { Type } from "class-transformer";
import { IsIn, IsInt, IsOptional, IsString } from "class-validator";

export class UpdateCheckoutDto {
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  shipping_method: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  payment_method: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  shipping_address: number;

  @IsString()
  @IsOptional()
  @IsIn(['ordered'])
  status: string;
}