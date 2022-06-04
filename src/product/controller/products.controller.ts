import { Controller, Post, Get, Put, Delete, Param, Req, Body, UseGuards } from '@nestjs/common';
import { UpdateResult, DeleteResult } from 'typeorm';
import { ProductsService } from '../service/products.service';
import { ProductEntity } from '../product.entity';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Request } from 'express';
import { UserEntity } from 'src/auth/user.entity';

@Controller('/v1/products')
export class ProductsController {
  constructor(private productsService: ProductsService) { }

  @Get()
  async getAll(): Promise<ProductEntity[]> {
    return await this.productsService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() product: ProductEntity, @Req() req: Request & { user: UserEntity }): Promise<ProductEntity> {
    return await this.productsService.create(product, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async GetOne(@Param() id: number): Promise<ProductEntity> {
    return await this.productsService.getOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async Update(@Param() id: number, @Body() product: ProductEntity, @Req() req): Promise<UpdateResult> {
    return await this.productsService.update(id, product, req.user);

  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async Delete(@Param() id: number, @Req() req): Promise<DeleteResult> {
    return await this.productsService.delete(id, req.user);

  }
}
