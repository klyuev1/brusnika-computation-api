import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FacadesService } from './facades.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Facade } from './facades.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { createFacadeDto } from './dto/create-facade.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Фасады')
@Controller('facades')
export class FacadesController {

    constructor (private facadeServise: FacadesService) {}

    @ApiOperation({summary:'Получить все фасады'})
    @ApiResponse({status: 200, type: [Facade]})
    @UseGuards(JwtAuthGuard)
    @Get()
    getAll() {
        return this.facadeServise.getAllFacades();
    }

    @ApiOperation({summary:'Создание пользователя'})
    @ApiResponse({status: 200, type: Facade})
    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    create(@Body() facadeDto: createFacadeDto, @UploadedFile() image) {
        return this.facadeServise.createFacade(facadeDto, image);
    }

    @ApiOperation({summary:'Создание пользователя'})
    @ApiResponse({status: 200, type: Facade})
    @UseGuards(JwtAuthGuard)
    @Delete('/:value')
    delete(@Param('value') value: string) {
        return this.facadeServise.deleteFacade(+value)
    }
}
