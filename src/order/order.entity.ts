
import { Entity, OneToMany, JoinColumn, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm'
import { CartEntity } from '../cart/cart.entity'

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @ManyToMany(type => CartEntity)
  @JoinTable()
  items: CartEntity[];

  @Column()
  subTotal: number

  @Column({ default: false })
  payed: boolean

  @Column()
  userId: number

}



