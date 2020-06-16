import { NestFactory } from '@nestjs/core';
import { AppdModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from './config/config.service';

import { newEnforcer } from 'casbin';
import { authz } from './authorization.middleware';

import { join } from 'path';

async function bootstrap() {
    console.log("bootstrap call");
    const app = await NestFactory.create(AppdModule);
    const configService = app.get(ConfigService);
    const port = configService.get('PORT') || 2222;
    // authorization middleware that is registered as global middleware
    app.use(authz(async() => {
        const enforcer = await newEnforcer(join(__dirname, 'casbin_conf/model.conf'), join(__dirname, 'casbin_conf/policy.csv'));
        return enforcer;
    }));
    app.useLogger(Logger)

    await app.listen(port);
}
bootstrap();
