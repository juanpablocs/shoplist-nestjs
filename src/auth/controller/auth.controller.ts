import { Controller, Req, Post, UseGuards, Body } from '@nestjs/common';
import { Request } from 'express';
import { LoginAuthDto } from '../auth.dto';
import { LocalAuthGuard } from '../local.guard';
import { AuthService } from '../service/auth.service';
import { UserEntity } from '../user.entity';

@Controller('/v1/auth/')
export class AuthController {
  constructor(private usersService: AuthService) { }

  @Post('signup')
  async signup(@Body() user: UserEntity): Promise<UserEntity> {
    return this.usersService.signup(user);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Body() _: LoginAuthDto, @Req() req: Request & { user: UserEntity }) {
    return this.usersService.login(req.user)
  }
}
