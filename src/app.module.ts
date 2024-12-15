import { Module } from '@nestjs/common';
import { PortfolioModule } from './portfolio/portfolio.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfig, DatabaseConfig } from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Portfolio } from './portfolio/entity/portfolio.entity';
import { DataSeedService } from './seed/data-seed.service';
import { SerializerService } from './shared/services/serilizer.service';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { APP_FILTER } from '@nestjs/core';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [AppConfig, DatabaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Portfolio]),
    PortfolioModule],
  providers: [DataSeedService, SerializerService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    }],

})
export class AppModule {
}
