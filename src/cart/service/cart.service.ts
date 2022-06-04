import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from '../cart.entity';
import { ProductsService } from 'src/product/service/products.service';
import { NotFoundProduct } from '../cart.exception';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
    private productsService: ProductsService,
  ) { }

  async addToCart(productId: number, quantity: number, userId: number): Promise<any> {
    const cartItems = await this.cartRepository.find({ where: { userId } });
    const product = await this.productsService.getOne(productId);

    // TODO: confirm stock

    if (product) {
      //confirm if item is exists in the cart
      const cart = cartItems.find(item => item.productId === productId);

      if (cart) {
        //Update the item quantity
        quantity += cart.quantity;
        const total = cart.price * quantity;
        return this.cartRepository.update(cart.id, { quantity, total });
      }

      const newItem = {
        productId!: product.id,
        price: product.price,
        quantity,
        total: product.price * quantity,
        userId
      }
      return this.cartRepository.save(newItem)
    }
    throw new NotFoundProduct;
  }

  async getItemsInCart(userId: number): Promise<CartEntity[]> {
    return this.cartRepository.find({ where: { userId } });
  }

  async emptyCart(userId: number) {
    const items = await this.cartRepository.find({ where: { userId } });
    return this.cartRepository.remove(items);
  }
}
