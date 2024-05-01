import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface CollectionCreationAttributes {
  name: string;
  YLawn: number;
  YPerennials:number;
  YPerennialsCF: number;
  YPerennialsGL: number;
  YShrubsStandartD: number;
  YShrubsStandartC: number;
  YShrubsAccent: number;
  YShrubsAM: number;
  YShrubsAH: number;
  YHedge: number;
  YHedgeM: number;
  YHedgeH: number;
  YHedgeA: number;
  YTreesStandartD: number;
  YTreesSDS: number;
  YTreesSDM: number;
  YTreesStandartC: number;
  YTreesAccent: number;
  YVines: number;
  YMoldedTrees: number;
  YSumPercent: number;

  SLawn: number;
  SPerennials:number;
  SShrubsStandartD: number;
  SShrubsStandartC: number;
  SShrubsAccent: number;
  SHedgeA: number;
  STreesStandartD: number;
  STreesSDS: number;
  STreesSDM: number;
  STreesAccent: number;
  STreesGiant: number;
  SSumPercent: number;
}

@Table({ tableName: 'collections' })
export class Collection extends Model<Collection, CollectionCreationAttributes> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор фасада' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Scandinavia', description: 'Наименование коллекции' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: '6.25', description: 'Двор. Газон рулонный в процентах' })
  @Column({ type: DataType.FLOAT })
  YLawn: number;
  
  @ApiProperty({ example: '6.25', description: 'Двор. Многолетники в процентах' })
  @Column({ type: DataType.FLOAT })
  YPerennials: number;
  
  @ApiProperty({ example: '6.25', description: 'Двор. Многолетники: злаки, цветущие в процентах' })
  @Column({ type: DataType.FLOAT })
  YPerennialsCF: number;
  
  @ApiProperty({ example: '6.25', description: 'Двор. Многолетники: почвопокровные, низкие в процентах' })
  @Column({ type: DataType.FLOAT })
  YPerennialsGL: number;
  
  @ApiProperty({ example: '6.25', description: 'Двор. Кустарники стандартные - лиственные в процентах' })
  @Column({ type: DataType.FLOAT })
  YShrubsStandartD: number;
  
  @ApiProperty({ example: '6.25', description: 'Двор. Кустарники стандартные - хвойные в процентах' })
  @Column({ type: DataType.FLOAT })
  YShrubsStandartC: number;
  
  @ApiProperty({ example: '6.25', description: 'Двор. Кустарники акцентные в процентах' })
  @Column({ type: DataType.FLOAT })
  YShrubsAccent: number;
  
  @ApiProperty({ example: '6.25', description: 'Двор. Кустарники акцентные: Средние в процентах' })
  @Column({ type: DataType.FLOAT })
  YShrubsAM: number;
  
  @ApiProperty({ example: '6.25', description: 'Двор. Кустарники акцентные: Высокие в процентах' })
  @Column({ type: DataType.FLOAT })
  YShrubsAH: number;
  
  @ApiProperty({ example: '6.25', description: 'Двор. Изгороди в процентах' })
  @Column({ type: DataType.FLOAT })
  YHedge: number;
  
  @ApiProperty({ example: '6.25', description: 'Двор. Изгороди: Средние в процентах' })
  @Column({ type: DataType.FLOAT })
  YHedgeM: number;
  
  @ApiProperty({ example: '6.25', description: 'Двор. Изгороди: Высокие в процентах' })
  @Column({ type: DataType.FLOAT })
  YHedgeH: number;
  
  @ApiProperty({ example: '6.25', description: 'Двор. Изгороди: Cредняя (Массив) в процентах' })
  @Column({ type: DataType.FLOAT })
  YHedgeA: number;
  
  @ApiProperty({ example: '6.25', description: 'Двор. Деревья стандартные: лиственные в процентах' })
  @Column({ type: DataType.FLOAT })
  YTreesStandartD: number;
  
  @ApiProperty({ example: '6.25', description: 'Двор. Деревья стандартные: лиственные штамб(36.25-40) в процентах' })
  @Column({ type: DataType.FLOAT })
  YTreesSDS: number;
  
  @ApiProperty({ example: '6.25', description: 'Двор. Деревья стандартные: лиственные мультиштамб в процентах' })
  @Column({ type: DataType.FLOAT })
  YTreesSDM: number;
  
  @ApiProperty({ example: '6.25', description: 'Двор. Деревья стандартные: хвойные в процентах' })
  @Column({ type: DataType.FLOAT })
  YTreesStandartC: number;
  
  @ApiProperty({ example: '6.25', description: 'Двор. Деревья акцентные: лиственные и хвойные в процентах' })
  @Column({ type: DataType.FLOAT })
  YTreesAccent: number;
  
  @ApiProperty({ example: '6.25', description: 'Двор. Лианы в процентах' })
  @Column({ type: DataType.FLOAT })
  YVines: number;

  @ApiProperty({ example: '6.25', description: 'Двор. Формованные деревья' })
  @Column({ type: DataType.FLOAT })
  YMoldedTrees: number;

  @ApiProperty({ example: '100', description: 'Двор. Процент заполненности во дворе' })
  @Column({ type: DataType.FLOAT, allowNull: false })
  YSumPercent: number;

  @ApiProperty({ example: '6.25', description: 'Улица. Газон рулонный в процентах' })
  @Column({ type: DataType.FLOAT })
  SLawn: number;

  @ApiProperty({ example: '6.25', description: 'Улица. Многолетники в процентах' })
  @Column({ type: DataType.FLOAT })
  SPerennials: number;

  @ApiProperty({ example: '6.25', description: 'Улица. Кустарники стандартные - лиственные в процентах' })
  @Column({ type: DataType.FLOAT })
  SShrubsStandartD: number;

  @ApiProperty({ example: '6.25', description: 'Улица. Кустарники стандартные - хвойные в процентах' })
  @Column({ type: DataType.FLOAT })
  SShrubsStandartC: number;

  @ApiProperty({ example: '6.25', description: 'Улица. Кустарники акцентные в процентах' })
  @Column({ type: DataType.FLOAT })
  SShrubsAccent: number;

  @ApiProperty({ example: '6.25', description: 'Улица. Изгороди: Cредняя (Массив) в процентах' })
  @Column({ type: DataType.FLOAT })
  SHedgeA: number;

  @ApiProperty({ example: '6.25', description: 'Улица. Деревья стандартные: лиственные в процентах' })
  @Column({ type: DataType.FLOAT })
  STreesStandartD: number;

  @ApiProperty({ example: '6.25', description: 'Улица. Деревья стандартные: лиственные штамб(36.25-40) в процентах' })
  @Column({ type: DataType.FLOAT })
  STreesSDS: number;

  @ApiProperty({ example: '6.25', description: 'Улица. Деревья стандартные: лиственные мультиштамб в процентах' })
  @Column({ type: DataType.FLOAT })
  STreesSDM: number;

  @ApiProperty({ example: '6.25', description: 'Улица. Деревья акцентные: лиственные и хвойные в процентах' })
  @Column({ type: DataType.FLOAT })
  STreesAccent: number;

  @ApiProperty({ example: '6.25', description: 'Улица. Деревья второй величины в процентах' })
  @Column({ type: DataType.FLOAT })
  STreesGiant: number;

  @ApiProperty({ example: '100', description: 'Улица. Процент заполненности во дворе' })
  @Column({ type: DataType.FLOAT, allowNull: false })
  SSumPercent: number;

}
