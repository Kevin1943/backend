import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeviceDto {
  @IsNotEmpty()
  @IsString()
  deviceName: string;

  @IsNotEmpty()
  @IsString()
  deviceType: string;

  @IsNotEmpty()
  @Transform(({ value }) => value === 'true')
  isActive: boolean;
}
