import { BaseEntity } from "./base.entity"
import { Column } from "typeorm";

export class IndexEntity extends BaseEntity{
  
    @Column()
    keyWord : string

    @Column()
    idEntity : number

}