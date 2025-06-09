import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
export enum DeviceType {
  ANDROID = 'android',
  IOS = 'ios',
  UNKNOWN = 'unknown',
}

@Entity('user_devices')
export class UserDeviceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'device_id',
    type: 'varchar',
  })
  deviceId: string;

  @Column({
    name: 'user_id',
    type: 'int',
  })
  userId: number;

  @Column({
    name: 'device_type',
    type: 'enum',
    enum: DeviceType,
    default: DeviceType.UNKNOWN,
  })
  deviceType: string;
}
