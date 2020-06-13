import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { CONFIG_OPTIONS } from './constants';

@Module({
  imports: [],
  providers: [
        {
            provide: CONFIG_OPTIONS,
            useValue: { folder: '.' },
        },
        ConfigService
    ],
    exports: [ConfigService]
})
export class ConfigModule {}
