import { ApiProperty } from "@nestjs/swagger";
import {  IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Providers } from "./currency.enum";


export class ExchangeDto {
  
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @IsEnum(Providers)
  readonly provider: Providers;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly base : string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly target : string;
}
