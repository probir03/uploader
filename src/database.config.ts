import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from './config/config.service';


@Injectable()
export class DatabaseConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}
  
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
        type: 'postgres',
        host: this.configService.get('SQL_DB_HOST'),
        port: Number(this.configService.get('SQL_DB_PORT')),
        username:this.configService.get('SQL_DB_USER'),
        password: this.configService.get('SQL_DB_PASSWORD'),
        database: this.configService.get('SQL_DB'),
        synchronize: true,
        logging: false,
        entities: ['dist/**/*.entity.js'],
      }
  }
}