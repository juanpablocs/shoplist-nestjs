import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class CartEntity {
  @PrimaryColumn()
  id: number

  @Column()
  productId: number

  @Column()
  quantity: number

  @Column()
  price: number

  @Column()
  total: number

  @Column()
  userId: number
}
