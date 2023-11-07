import { Body, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common"
import { FindManyOptions, FindOneOptions } from "typeorm"
import { BaseService } from "./base.service"
import { AuthGuard } from "@nestjs/passport";

// @UseGuards(AuthGuard('jwt'))
export abstract class BaseController<Entity> {
    
    constructor(public readonly service: BaseService<Entity>) {}

    @Get()
    async getAll(){
        
        return await this.service.find({})
    }

    @Get(':id')
    async getOneById(@Param('id')id){
        let req: FindOneOptions = {
            where: {
                id: id
            }
        }
        return this.service.findOne(req)
    }

    @Post('findOne')
    async getOne(@Body()body: FindOneOptions){
        return this.service.findOne(body)
    }

    @Post('findMany')
    async getMany(@Body()body: FindManyOptions){
        return this.service.find(body)
    }

    @Post('createMany')
    async createMany(@Body()body: Entity[]){
        return this.service.createMany(body)
    }

    @Post()
    async createOne(@Body()body: Entity){
        console.log("CREATE baseController Body -> ", body)
        return this.service.createOne(body)
    }

    @Put(':id')
    async updateOneById(@Param('id')id ,@Body()body: Entity){
        /* let criteria = {
            id: id
        } */
        // console.log("updateOneById Body -> ", body)
        return this.service.updateOne(null, body)
    }

    @Delete(':id')
    async deleteOneById(@Param('id')id){
        console.log('delete id')
        let criteria = {
            id: id
        }
        return this.service.deleteOne(criteria)
    }

    @Delete('cascade')
    async deleteCascade(@Body()body: Entity){
        console.log('cascade body: %o', body)
        return this.service.deleteCascade(body)
    }
}