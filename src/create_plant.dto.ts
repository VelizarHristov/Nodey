import { IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePlantDto {
  name: string;

  @IsBoolean()
  @Transform(({ value } ) => value === "true", { toClassOnly: true })
  flowering: boolean;
}
