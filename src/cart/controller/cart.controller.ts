import { Controller, Post, Get, Req, Delete, Body, UseGuards } from '@nestjs/common';
import { CartService } from '../service/cart.service';
import { CartEntity } from '../cart.entity';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Request } from 'express';
import { UserEntity } from 'src/auth/user.entity';
import { CreateCartDto } from '../cart.dto';

@Controller('/v1/cart')
export class CartController {
  constructor(private cartService: CartService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async AddToCart(@Body() body: CreateCartDto, @Req() req: Request & { user: UserEntity }): Promise<CartEntity[]> {
    const { productId, quantity } = body;
    await this.cartService.addToCart(productId, quantity, req.user.id);
    return this.cartService.getItemsInCart(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getItemsInCart(@Req() req: Request & { user: UserEntity }): Promise<CartEntity[]> {
    return await this.cartService.getItemsInCart(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async emptyCat(@Req() req: Request & { user: UserEntity }): Promise<any> {
    return this.cartService.emptyCart(req.user.id)
  }

}

