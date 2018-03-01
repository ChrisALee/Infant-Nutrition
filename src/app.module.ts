import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { PhotoModule } from './photo/photo.module';

@Module({
    controllers: [AppController],
    components: [],
    imports: [TypeOrmModule.forRoot(), PhotoModule],
})
export class ApplicationModule {
    constructor(private readonly connection: Connection) {}
}
