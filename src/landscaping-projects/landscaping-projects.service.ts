import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { LandscapingProject, ProjectElement } from './landscaping-projects.model';
import { InjectModel } from '@nestjs/sequelize';
import { createProjectDto } from './dto/create-project.dto';
import { Collection } from '../collections/collections.model';
import { projectElements } from './landscaping-projects.constants';
@Injectable()
export class LandscapingProjectsService {
    constructor(
        @InjectModel(LandscapingProject) private landscapingProjectsRepository: typeof LandscapingProject,
        @InjectModel(Collection) private collectionRepository: typeof Collection
    ) { }

    async getAllProjects() {
        const projects = await this.landscapingProjectsRepository.findAll({
            include: { all: true },
        });
        return projects;
    }

    async createProject(dto: createProjectDto) {

        const {name, region, collection, areaYard, areaStreet} = dto

        const generalVolumeYard = 0.35 * areaYard
        const generalVolumeStreet = 0.15 * areaStreet
        
        const selectedCollection = await this.collectionRepository.findOne({ where: { name: collection } });
        if (!selectedCollection) {
          throw new NotFoundException('Коллекция не найдена');
        }

        const updatedElements = projectElements.map(element => {
            const selectedPer = selectedCollection[element.name];
            let volume = 0;
            let summary = 0;
            if (selectedPer !== undefined) {
                if (element.name.startsWith('S')) {
                    volume = selectedPer * generalVolumeStreet / 100;
                }
                else if (element.name.startsWith('Y')) {
                    volume = selectedPer * generalVolumeYard / 100;
                }
                else {
                    throw new ForbiddenException('Что-то не так с базой данных'); 
                }

                if (name === element.parent) {
                  summary = volume/element.H;
                }
                // if (name !== element.parent){
                //   summary += 
                // }

                // if (element.H === undefined) {
                // }
                    
              return {
                ...element,
                Per: selectedPer,
                V: volume,
                S: volume/element.H,
                Q: element.S * element.rate,
              };
            } else {
              return element; 
            }
          });
        const resultData = {name, region, collection, areaYard, areaStreet, elements: updatedElements}
        const project = await this.landscapingProjectsRepository.create(resultData);
        return project;
    }
}
