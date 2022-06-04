import { IsNotEmpty, IsEmail } from "class-validator";

export class CreateCartDto {
  @IsNotEmpty()
  productId: number;

  @IsNotEmpty()
  quantity: number;
}
