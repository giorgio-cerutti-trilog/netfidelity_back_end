import { Injectable } from "@nestjs/common";
import { IndexEntity } from "src/database/entities/base-entities/index.entity";
import { Repository } from "typeorm";
import { BaseService } from "./base.service";

@Injectable()
export abstract class BaseIndexService<Entity, Index extends IndexEntity> extends BaseService<Index>{
    
    abstract columns : string[]

    constructor(
        public readonly repository : Repository<Index>){
		super(repository)
	}

    saveIndexes(entity : Entity){
        
        let indexes : any[]= []	

		Object.keys(entity).forEach((element) => {
            let kWs: any [] = [];
			if (this.columns.includes(element)) {
				if (entity[element]) {
					let period = entity[element].toString().replace(/'/g, " ");
					//console.log("frase da splittare", period);
					kWs = period.split(" ");
					kWs.forEach(keyword => {
						if (keyword && keyword != ' ') {
                            let newIndex: any = {keyword: '', idEntity: 0}
							newIndex.keyWord = keyword.toLowerCase();
							newIndex.idEntity = entity['id'];

							indexes.push(newIndex);
						}
					});
				}
			}

		});
        this.createMany(indexes)		
    }

	
}