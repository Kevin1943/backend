import { Controller, UseGuards, Post, Request, Get, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DeviceService } from './device.service';
import { Device } from './schema/device.schema';

@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  getAllDevice(): Promise<Device[]> | null {
    return this.deviceService.getAllDevice();
  }
}
