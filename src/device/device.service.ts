import { Injectable } from '@nestjs/common';
import { Device, DeviceDocument } from './schema/device.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DeviceService {
  constructor(@InjectModel(Device.name) private deviceModel: Model<DeviceDocument>) {}

  async getAllDevice(): Promise<Device[]> | null {
    const devices = await this.deviceModel.find({});
    return devices;
  }
}
