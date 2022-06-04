import { Injectable } from '@nestjs/common';
import { OrderEntity } from '../order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CartService } from 'src/cart/service/cart.service';

@Injectable()
export class OrderService {
  constructor(@InjectRepository(OrderEntity) private orderRepository: Repository<OrderEntity>, private cartService: CartService) { }

  async order(userId: number): Promise<OrderEntity> {
    const items = await this.cartService.getItemsInCart(userId);
    const subTotal = items.reduce((acc, next) => acc + next.total, 0);
    const order = { items, subTotal, userId }
    const createOrder = await this.orderRepository.save(order);
    return createOrder;
  }

  async getOrders(userId: number): Promise<OrderEntity[]> {
    return this.orderRepository.find({ where: { userId }, relations: ['items'] });
  }
}
