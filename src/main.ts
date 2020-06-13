import { NestFactory } from '@nestjs/core';
import { AppdModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
    console.log("bootstrap call");
    const app = await NestFactory.create(AppdModule);
    app.useLogger(Logger)

    await app.listen(2222);
}
bootstrap();
