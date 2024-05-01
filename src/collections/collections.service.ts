import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Collection } from './collections.model';
import { createCollectionDto } from './dto/create-collection.dto';

@Injectable()
export class CollectionsService {
    constructor(
        @InjectModel(Collection) private collectionRepository: typeof Collection
    ) { }

    private changeDto(dto: createCollectionDto) {
        const { name, YLawn, YPerennialsCF, YPerennialsGL, YShrubsStandartD,
            YShrubsStandartC, YShrubsAM, YShrubsAH, YHedgeM, YHedgeH, YHedgeA, YTreesSDS,
            YTreesSDM, YTreesStandartC, YTreesAccent, YVines, YMoldedTrees,
            SLawn, SPerennials, SShrubsStandartD, SShrubsStandartC, SShrubsAccent, SHedgeA,
            STreesSDS, STreesSDM, STreesAccent, STreesGiant,
        } = dto;

        const YPerennials = YPerennialsCF + YPerennialsGL;
        const YShrubsAccent = YShrubsAM + YShrubsAH;
        const YHedge = YHedgeM + YHedgeH + YHedgeA;
        const YTreesStandartD = YTreesSDS + YTreesSDM;
        const YSumPercent = YLawn + YPerennials + YShrubsStandartD + YShrubsStandartC +
            YShrubsAccent + YHedge + YTreesStandartD + YTreesStandartC + YTreesAccent +
            YVines + YMoldedTrees;
        const STreesStandartD = STreesSDS + STreesSDM;
        const SSumPercent = SLawn + SPerennials + SShrubsStandartD + SShrubsStandartC +
            SShrubsAccent + SHedgeA + STreesStandartD + STreesAccent + STreesGiant;
        if (YSumPercent != 100 || SSumPercent != 100) {
            throw new HttpException(
                'Сумма элементов коллекций должна быть 100 процентов',
                HttpStatus.CONFLICT,
            );
        }

        const res = {
            name,
            YLawn,
            YPerennials,
            YPerennialsCF,
            YPerennialsGL,
            YShrubsStandartD,
            YShrubsStandartC,
            YShrubsAccent,
            YShrubsAM,
            YShrubsAH,
            YHedge,
            YHedgeM,
            YHedgeH,
            YHedgeA,
            YTreesStandartD,
            YTreesSDS,
            YTreesSDM,
            YTreesStandartC,
            YTreesAccent,
            YVines,
            YMoldedTrees,
            YSumPercent,
            SLawn,
            SPerennials,
            SShrubsStandartD,
            SShrubsStandartC,
            SShrubsAccent,
            SHedgeA,
            STreesStandartD,
            STreesSDS,
            STreesSDM,
            STreesAccent,
            STreesGiant,
            SSumPercent 
        }

        return res;
    }

    async getAllCollections() {
        const collections = await this.collectionRepository.findAll({
            include: { all: true },
        });
        return collections;
    }

    async createCollection(dto: createCollectionDto) {
        const resultDto = this.changeDto(dto)
        const collection = await this.collectionRepository.create(resultDto);
        return collection;
    }

    async updateCollection(collectionId: number, dto: createCollectionDto) {
        const findingCollection = await this.collectionRepository.findOne({
            where: { id: collectionId },
        });
        if (!findingCollection) throw new NotFoundException('Коллекция не найдена');
        const resultDto = this.changeDto(dto)
        const collection  = await this.collectionRepository.update(resultDto, {
            where: { id: collectionId },
        });
        return collection;
    }

    async deleteCollection(collectionId: number) {
        const collection = await this.collectionRepository.findOne({
            where: { id: collectionId },
        });
        if (!collection) {
            throw new HttpException(
                'Коллекция с таким ID не найден',
                HttpStatus.NOT_FOUND,
            );
        }
        await this.collectionRepository.destroy({ where: { id: collectionId } });
        return collection;
    }
}
