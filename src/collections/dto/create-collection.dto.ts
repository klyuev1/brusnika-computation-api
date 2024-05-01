import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class createCollectionDto {
  @ApiProperty({ example: 'Фасад 1', description: 'Наименование фасада' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(2, 20, { message: 'Длина должна быть от 2 до 20 символов' })
  readonly name: string;

  @ApiProperty({ example: '5', description: 'Двор. Газон рулонный в процентах' })
  readonly YLawn: number;
  
  @ApiProperty({ example: '5', description: 'Двор. Многолетники в процентах' })
  readonly YPerennials: number;
  
  @ApiProperty({ example: '5', description: 'Двор. Многолетники: злаки, цветущие в процентах' })
  readonly YPerennialsCF: number;
  
  @ApiProperty({ example: '5', description: 'Двор. Многолетники: почвопокровные, низкие в процентах' })
  readonly YPerennialsGL: number;
  
  @ApiProperty({ example: '5', description: 'Двор. Кустарники стандартные - лиственные в процентах' })
  readonly YShrubsStandartD: number;
  
  @ApiProperty({ example: '5', description: 'Двор. Кустарники стандартные - хвойные в процентах' })
  readonly YShrubsStandartC: number;
  
  @ApiProperty({ example: '5', description: 'Двор. Кустарники акцентные в процентах' })
  readonly YShrubsAccent: number;
  
  @ApiProperty({ example: '5', description: 'Двор. Кустарники акцентные: Средние в процентах' })
  readonly YShrubsAM: number;
  
  @ApiProperty({ example: '5', description: 'Двор. Кустарники акцентные: Высокие в процентах' })
  readonly YShrubsAH: number;
  
  @ApiProperty({ example: '5', description: 'Двор. Изгороди в процентах' })
  readonly YHedge: number;
  
  @ApiProperty({ example: '5', description: 'Двор. Изгороди: Средние в процентах' })
  readonly YHedgeM: number;
  
  @ApiProperty({ example: '5', description: 'Двор. Изгороди: Высокие в процентах' })
  readonly YHedgeH: number;
  
  @ApiProperty({ example: '5', description: 'Двор. Изгороди: Cредняя (Массив) в процентах' })
  readonly YHedgeA: number;
  
  @ApiProperty({ example: '5', description: 'Двор. Деревья стандартные: лиственные в процентах' })
  readonly YTreesStandartD: number;
  
  @ApiProperty({ example: '5', description: 'Двор. Деревья стандартные: лиственные штамб(35-40) в процентах' })
  readonly YTreesSDS: number;
  
  @ApiProperty({ example: '5', description: 'Двор. Деревья стандартные: лиственные мультиштамб в процентах' })
  readonly YTreesSDM: number;
  
  @ApiProperty({ example: '5', description: 'Двор. Деревья стандартные: хвойные в процентах' })
  readonly YTreesStandartC: number;
  
  @ApiProperty({ example: '5', description: 'Двор. Деревья акцентные: лиственные и хвойные в процентах' })
  readonly YTreesAccent: number;
  
  @ApiProperty({ example: '5', description: 'Двор. Лианы в процентах' })
  readonly YVines: number;

  @ApiProperty({ example: '5', description: 'Двор. Формованные деревья' })
  readonly YMoldedTrees: number;

  @ApiProperty({ example: '100', description: 'Двор. Процент заполненности во дворе' })
  readonly YSumPercent: number;

  @ApiProperty({ example: '5', description: 'Улица. Газон рулонный в процентах' })
  readonly SLawn: number;

  @ApiProperty({ example: '5', description: 'Улица. Многолетники в процентах' })
  readonly SPerennials: number;

  @ApiProperty({ example: '5', description: 'Улица. Кустарники стандартные - лиственные в процентах' })
  readonly SShrubsStandartD: number;

  @ApiProperty({ example: '5', description: 'Улица. Кустарники стандартные - хвойные в процентах' })
  readonly SShrubsStandartC: number;

  @ApiProperty({ example: '5', description: 'Улица. Кустарники акцентные в процентах' })
  readonly SShrubsAccent: number;

  @ApiProperty({ example: '5', description: 'Улица. Изгороди: Cредняя (Массив) в процентах' })
  readonly SHedgeA: number;

  @ApiProperty({ example: '5', description: 'Улица. Деревья стандартные: лиственные в процентах' })
  readonly STreesStandartD: number;

  @ApiProperty({ example: '5', description: 'Улица. Деревья стандартные: лиственные штамб(35-40) в процентах' })
  readonly STreesSDS: number;

  @ApiProperty({ example: '5', description: 'Улица. Деревья стандартные: лиственные мультиштамб в процентах' })
  readonly STreesSDM: number;

  @ApiProperty({ example: '5', description: 'Улица. Деревья акцентные: лиственные и хвойные в процентах' })
  readonly STreesAccent: number;

  @ApiProperty({ example: '5', description: 'Улица. Деревья второй величины в процентах' })
  readonly STreesGiant: number;

  @ApiProperty({ example: '100', description: 'Улица. Процент заполненности во дворе' })
  readonly SSumPercent: number;

}
