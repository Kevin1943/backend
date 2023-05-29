import { PartialType } from '@nestjs/mapped-types';
import { DeviceDto } from './device.dto';

export class UpdateDeviceDto extends PartialType(DeviceDto) {}
