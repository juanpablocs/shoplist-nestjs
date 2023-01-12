import { Controller, Post, Get, Req, UseGuards, Inject } from '@nestjs/common';
import { OrderService } from '../service/order.service'
import { OrderEntity } from '../order.entity';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Request } from 'express';
import { UserEntity } from 'src/auth/user.entity';
import { ClientProxy } from '@nestjs/microservices';

@Controller('/v1/order')
export class OrderController {
  constructor(
    private orderService: OrderService,
    @Inject('PAY_MICROSERVICE')
    private readonly client: ClientProxy
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async order(@Req() req: Request & { user: UserEntity }): Promise<OrderEntity[]> {
    await this.orderService.order(req.user.id);
    return this.orderService.getOrders(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getOrders(@Req() req: Request & { user: UserEntity }): Promise<OrderEntity[]> {
    return await this.orderService.getOrders(req.user.id)
  }

  @Post('/pay')
  async postMicroservice() {
    return this.client.send({ role: 'item', cmd: 'create' }, { id: 200 });
  }
}
