import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type DeviceDocument = HydratedDocument<Device>;

@Schema({
  timestamps: true,
})
export class Device {
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true })
  deviceName: string;

  @Prop({ required: true })
  deviceType: string;

  @Prop({})
  isActive: boolean;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
