import { Body, Controller, Post, Res } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('login')
  async login(@Res() response: Response, @Body() loginDto: LoginDto) : Promise<Response<string, Record<string, string>>> {
    const result = await this.loginService.login(
      loginDto.emailOrUsername,
      loginDto.password,
    );
	
    response.cookie('token', result.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    return response.json({ token: result.token, user: result.user });
  }
}
