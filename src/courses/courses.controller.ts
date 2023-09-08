import { Body, Controller, Delete, Param, Post, Query } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Get } from '@nestjs/common';
import { CreateCourseDto } from './create-course.dto';
import {
    ApiOperation,
    ApiResponse,
    ApiTags,
  } from '@nestjs/swagger';

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
    constructor(private coursesService: CoursesService){

    }

    //get method
    @Get()
    async getCourses (){
        const courses  = await this.coursesService.getCourses();
        return courses;
    }

    //get by id
    @Get(':courseId')
    async getCourse(@Param('courseId') courseId) {
        const course = await this.coursesService.getCourse(courseId);
        return course;
    }

    //add 
    @Post()
    async addCourse(@Body() createCourseDto: CreateCourseDto) {
        const course = await this.coursesService.addCourse(createCourseDto);
        return course;
    }

    //delete
    @Delete()
    async deleteCourse(@Query() query) {
        const courses = await this.coursesService.deleteCourse(query.courseId);
        return courses;
    }
}
