import { IsNumber, IsString } from "class-validator";

export class CreateProjectDto {
  @IsString({message: 'Должно быть строкой'})
  readonly name: string;

  @IsNumber({}, {message: 'Должно быть числом'})
  readonly tOutside: number;

  @IsNumber({}, {message: 'Должно быть числом'})
  readonly tInside: number;

  @IsNumber({}, {message: 'Должно быть числом'})
  readonly rWall: number;
  
  @IsNumber({}, {message: 'Должно быть числом'})
  readonly rWindow: number;
  
  @IsNumber({}, {message: 'Должно быть числом'})
  readonly beta: number;
  
  @IsNumber({}, {message: 'Должно быть числом'})
  readonly kHousehold: number;
}