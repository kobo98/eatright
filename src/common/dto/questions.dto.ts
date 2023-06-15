import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsObject,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

class AnswersDto {
  @IsArray()
  diet: string[];

  @IsString()
  medicalConditions: string;

  @IsString()
  intolerances: string;

  @IsString()
  healthGoals: string;

  @IsNumber()
  budget: number;
}

export class SubmitAnswersDto {
  @IsUUID()
  userId: string;

  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => AnswersDto)
  answers: AnswersDto;
}
