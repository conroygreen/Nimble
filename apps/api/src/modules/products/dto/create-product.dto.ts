import { IsString, IsNotEmpty, IsNumber, IsOptional, IsBoolean, IsObject, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Business Cards' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'business-cards' })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 49.99 })
  @IsNumber()
  basePrice: number;

  @ApiProperty({ required: false })
  @IsObject()
  @IsOptional()
  quantityBreaks?: any;

  @ApiProperty({ required: false })
  @IsObject()
  @IsOptional()
  optionMarkups?: any;

  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  options?: any[];

  @ApiProperty({ required: false, example: '3.5x2' })
  @IsString()
  @IsOptional()
  trimSize?: string;

  @ApiProperty({ required: false, example: 300 })
  @IsNumber()
  @IsOptional()
  requiredDpi?: number;

  @ApiProperty({ required: false, example: 0.125 })
  @IsNumber()
  @IsOptional()
  requiredBleed?: number;

  @ApiProperty({ required: false, example: 'CMYK' })
  @IsString()
  @IsOptional()
  requiredColorSpace?: string;

  @ApiProperty({ required: false, default: true })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
