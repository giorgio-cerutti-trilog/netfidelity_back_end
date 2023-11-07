import { Logger } from '@nestjs/common';
import { FindManyOptions, FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';


export abstract class BaseService<Entity> {
    abstract logger: Logger;
  
    constructor(
      public readonly repository: Repository<Entity>
    ) { }
  
    async findOne(req: FindOneOptions) {
      return this.repository.findOne(req)
    }
  
    async find(req: FindManyOptions) {
      return this.repository.find(req)
    }
  
    async createOne(req: Entity) {
      let entity = this.repository.create(req);
      return this.repository.save(entity)
    }
  
    async createMany(req: Entity[]) {
      let entities = []
      req.forEach(entity => {
        entities.push(this.repository.create(entity))
      })
      return this.repository.save(entities)
    }
  
    async updateOne(criteria: FindOptionsWhere<Entity>, entity: any) {
      //console.log('updateOne entity %o', entity)
      try {
        return this.repository.save(entity/* , criteria */)
      }
      catch (error: any) {
        console.log('updateOne error %o', error)
        throw error;
      }
    }
  
    async deleteOne(criteria: FindOptionsWhere<Entity>) {
      return this.repository.delete(criteria)
    }
  
    async deleteCascade(entity: Entity){
      return this.repository.remove(entity)
    }
  }
  