import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Providers } from "./currency.enum";


export class ExchangeDto {

  @ApiProperty({
    description: "Source for currency exchange",
    required: true,
    enum: Providers
  })
  @IsNotEmpty()
  @IsString()
  @IsEnum(Providers)
  readonly provider: Providers;

  @ApiProperty({
    description: "Basic currency",
    example : "bitcoin",
    required: true
  })
  @IsNotEmpty()
  @IsString()
  readonly base: string;

  @ApiProperty({
    description: "Target currency",
    example : "usd",
    required: true })
  @IsNotEmpty()
  @IsString()
  readonly target: string;
}
