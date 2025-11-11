import { IsString, IsNotEmpty, IsOptional, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTenantDto {
  @ApiProperty({ example: 'Acme Print Shop' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'acme' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9-]+$/, {
    message: 'Subdomain must contain only lowercase letters, numbers, and hyphens',
  })
  subdomain: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  logo?: string;

  @ApiProperty({ required: false, example: '#3B82F6' })
  @IsString()
  @IsOptional()
  @Matches(/^#[0-9A-F]{6}$/i)
  primaryColor?: string;

  @ApiProperty({ required: false, example: '#1E40AF' })
  @IsString()
  @IsOptional()
  @Matches(/^#[0-9A-F]{6}$/i)
  secondaryColor?: string;

  @ApiProperty({ required: false, example: 'Inter' })
  @IsString()
  @IsOptional()
  fontFamily?: string;
}
