import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dir } from 'console';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
         
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:".env"
    }),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(confiservice:ConfigService)=>({

       type:"mysql",
        host:confiservice.get("DB_HOST"),
        database:confiservice.get("DB_NAME"),
        username:confiservice.get("DB_USERNAME"),
        password:confiservice.get("DB_PASSWORD"),
        port:confiservice.get<number>("DB_PORT"),
        synchronize:confiservice.get<boolean>("DB_SYNC"),
        autoLoadEntities:true,
        // logging:true

      })
    })
    
    
    ,UserModule, TodoModule ,AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} 
