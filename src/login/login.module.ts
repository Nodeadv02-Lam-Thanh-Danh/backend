import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule.register({
	global: true,
	secret: process.env.JWT_SECRET,
	signOptions: { expiresIn: '24h' },
  })],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
