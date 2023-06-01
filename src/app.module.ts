import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DeviceModule } from './device/device.module';

// TODO : change mongo path to .env
@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/dbname'), UserModule, AuthModule, DeviceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
