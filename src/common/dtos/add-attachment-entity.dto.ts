import { ArrayMinSize, IsNumber } from 'class-validator';

export class AddAttachmentEntityDto {
  @IsNumber({ allowNaN: false, allowInfinity: false }, { each: true })
  @ArrayMinSize(1)
  fileIds: number[];
}
