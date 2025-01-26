import { IsString, IsInt, IsOptional, IsDateString } from 'class-validator';

export class CreateActivityDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  type: string;

  @IsInt()
  userId: number;

  @IsDateString()
  @IsOptional()  // Make this optional
  date?: string;
}
