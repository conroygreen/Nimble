import { Controller, Post, Body } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

class PresignDto {
  key!: string; // e.g., tenantId/userId/filename
  contentType!: string;
}

@Controller('files')
export class FilesController {
  @Post('presign')
  async presign(@Body() dto: PresignDto) {
    const region = process.env.S3_REGION || 'us-east-1';
    const bucket = process.env.S3_BUCKET!;
    const credentials = {
      accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
    };
    const s3 = new S3Client({ region, credentials });
    const cmd = new PutObjectCommand({ Bucket: bucket, Key: dto.key, ContentType: dto.contentType });
    const url = await getSignedUrl(s3, cmd, { expiresIn: 60 * 5 });
    return { url, bucket, key: dto.key, contentType: dto.contentType };
  }
}
