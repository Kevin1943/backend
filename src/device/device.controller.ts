import { Controller, UseGuards, Post, Get, Body, Param, Put, Delete } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DeviceService } from './device.service';
import { Device } from './schema/device.schema';
import { DeviceDto } from './dto/device.dto';

@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  getAllDevice(): Promise<Device[]> | null {
    return this.deviceService.getAllDevice();
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  createDevice(@Body() deviceDto: DeviceDto): Promise<Device> | null {
    return this.deviceService.create(deviceDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:deviceId')
  getDevice(@Param() param: { deviceId: string }): Promise<Device> | null {
    const { deviceId } = param;
    return this.deviceService.getDevice(deviceId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:deviceId')
  updateDevice(@Param() param: { deviceId: string }, @Body() deviceDto: DeviceDto): Promise<Device> | null {
    const { deviceId } = param;
    return this.deviceService.updateDevice(deviceId, deviceDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:deviceId')
  deleteDevice(@Param() param: { deviceId: string }): Promise<{ success: true }> {
    const { deviceId } = param;
    return this.deviceService.deleteDevice(deviceId);
  }
}
