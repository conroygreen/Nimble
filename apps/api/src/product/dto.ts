import { IsBoolean, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name!: string;

  @IsString()
  @IsOptional()
  sku?: string;

  @IsString()
  type!: string;

  @IsString()
  tenantId!: string;

  @IsObject()
  optionsSchema!: Record<string, unknown>;

  @IsBoolean()
  @IsOptional()
  active?: boolean;
}

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name?: string;
  @IsString()
  @IsOptional()
  sku?: string;
  @IsString()
  @IsOptional()
  type?: string;
  @IsObject()
  @IsOptional()
  optionsSchema?: Record<string, unknown>;
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
