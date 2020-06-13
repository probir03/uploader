import { Module } from '@nestjs/common';
import { UploadModule } from './upload/upload.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [ConfigModule, UploadModule ]
})
export class AppdModule {}