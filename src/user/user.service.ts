import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/request/create-user.dto';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from 'hashing.util';
import { plainToClass, plainToInstance } from 'class-transformer';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prismaClient: PrismaClient) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await hashPassword(createUserDto.password);
    createUserDto.password = hashedPassword;
    const user = this.prismaClient.user.create({
      data: createUserDto,
    });

    return plainToInstance(User, user);
  }

  async findOne(id: number): Promise<User> {
    const user = await this.prismaClient.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return plainToClass(User, user);
  }

  async doesEmailExist(email: string): Promise<boolean> {
    return (
      (await this.prismaClient.user.count({
        where: {
          email: email,
        },
      })) > 0
    );
  }

  async doesUsernameExists(username: string): Promise<boolean> {
    return (
      (await this.prismaClient.user.count({
        where: {
          username: username,
        },
      })) > 0
    );
  }

  async doesPhoneExist(phone: string): Promise<boolean> {
    return (
      (await this.prismaClient.user.count({
        where: {
          phone: phone,
        },
      })) > 0
    );
  }
}
