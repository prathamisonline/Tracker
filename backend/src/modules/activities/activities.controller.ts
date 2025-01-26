import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { ActivitiesService } from './activities.service';

@Controller('activities')
export class ActivitiesController {
    constructor(private readonly activitiesService:ActivitiesService){}

    @Get()
    getAllActivities(){
        return this.activitiesService.findAll();
    }


    @Post()
    createActivity(@Body() createActivityDto:CreateActivityDto){
        return this.activitiesService.create(createActivityDto);
    }

    @Get(':id')
    async findOne(@Param('id')id:string){
        return this.activitiesService.findOne(+id)
    }

    
}
