import { IsNumber, IsString } from "class-validator";

export class CreateRoomDto {
  @IsString({message: 'Должно быть строкой'})
  readonly number: string;
  
  @IsString({message: 'Должно быть строкой'})
  readonly name: string;

  @IsNumber({}, {message: 'Должно быть числом'})
  readonly height: number;

  @IsNumber({}, {message: 'Должно быть числом'})
  readonly width: number;
  
  @IsNumber({}, {message: 'Должно быть числом'})
  readonly areaWall: number;
  
  @IsNumber({}, {message: 'Должно быть числом'})
  readonly areaWindow: number;
  
  @IsNumber({}, {message: 'Должно быть числом'})
  readonly areaRoom: number;
  
  @IsString({message: 'Должно быть строкой'})
  readonly numberFacade: string;
}