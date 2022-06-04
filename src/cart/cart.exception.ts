import { BadRequestException } from "@nestjs/common";

export class NotFoundProduct extends BadRequestException {
  constructor() {
    super('Product doesnt exist');
  }
}
