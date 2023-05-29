import { BadRequestException, Injectable } from '@nestjs/common';
import { Device, DeviceDocument } from './schema/device.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DeviceDto } from './dto/device.dto';
import { UpdateDeviceDto } from './dto/updateDevice.dto';

@Injectable()
export class DeviceService {
  constructor(@InjectModel(Device.name) private deviceModel: Model<DeviceDocument>) {}

  async getAllDevice(): Promise<Device[]> | null {
    const devices = await this.deviceModel.find({});
    return devices;
  }

  async create(deviceDto: DeviceDto): Promise<Device> {
    const device = await this.deviceModel.create(deviceDto);
    return device;
  }

  async getDevice(deviceId: string): Promise<Device> | null {
    const device = await this.deviceModel.findById({ _id: deviceId });
    return device;
  }

  async updateDevice(deviceId: string, updateDeviceDto: UpdateDeviceDto): Promise<Device> {
    const device = await this.getDevice(deviceId);
    if (!device) {
      throw new BadRequestException('deviceId not found');
    }
    const updatedDevice = await this.deviceModel.findByIdAndUpdate(deviceId, updateDeviceDto, {
      new: true,
      runValidators: true,
    });
    return updatedDevice;
  }

  async deleteDevice(deviceId: string): Promise<any> {
    const device = await this.getDevice(deviceId);
    if (!device) {
      throw new BadRequestException('deviceId not found');
    }
    const deletedDevice = await this.deviceModel.findByIdAndDelete(deviceId);
    return deletedDevice;
  }
}
