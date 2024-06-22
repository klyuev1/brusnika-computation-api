import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CollectionsService } from './collections.service';
import { Collection } from './collections.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { createCollectionDto } from './dto/create-collection.dto';

@ApiTags('Коллекции')
@Controller('landscaping/collections')
export class CollectionsController {
    constructor(private collectionServise: CollectionsService) {}

    @ApiOperation({ summary: 'Получить все коллекции' })
    @ApiResponse({ status: 200, type: [Collection] })
    @UseGuards(JwtAuthGuard)
    @Get()
    getAll() {
      return this.collectionServise.getAllCollections();
    }

    @ApiOperation({ summary: 'Создание новой коллекции' })
    @ApiResponse({ status: 200, type: Collection })
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() collectionDto: createCollectionDto) {
      return this.collectionServise.createCollection(collectionDto);
    }

    @ApiOperation({ summary: 'Создание новой коллекции' })
    @ApiResponse({ status: 200, type: Collection })
    @UseGuards(JwtAuthGuard)
    @Patch(':collectionId')
    update(
      @Param('collectionId') collectionId: string,
      @Body() collectionDto: createCollectionDto
    ) {
      return this.collectionServise.updateCollection(+collectionId, collectionDto);
    }

    @ApiOperation({ summary: 'Создание пользователя' })
    @ApiResponse({ status: 200, type: Collection })
    @UseGuards(JwtAuthGuard)
    @Delete('/:collectionId')
    delete(@Param('collectionId') collectionId: string) {
      return this.collectionServise.deleteCollection(+collectionId);
    }
  
}
