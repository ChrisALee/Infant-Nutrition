import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import * as path from 'path';
import { ApplicationModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule);

    app.use(express.static(path.join(__dirname, 'public')));
    app.set('views', __dirname + '/views');
    app.set('view engine', 'hbs');

    await app.listen(8080);
}
bootstrap();
