import { Injectable, Logger } from '@nestjs/common';
import { BaseService } from 'src/database/shared/base.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { CryptoService } from 'src/config/crypting/crypto';

@Injectable()
export class UsersService extends BaseService<User> {

  logger = new Logger(UsersService.name)

    constructor(
      private cryptoService: CryptoService,
      @InjectRepository(User)
      public repository: Repository<User>) {

        super(repository)
        
    }

    override async createOne(req: User): Promise<User> {
      console.log("body -> ", req);
      let pw = this.cryptoService.encrypt(req.password);
      req.password = pw;
      let entity = this.repository.create(req);

      return this.repository.save(entity)
    }

    findByEmail(email: string) {

      let user: User;
      return user;
    }


    resetPassword(id: number, data: any) {
      let user: User;
      return { id: user.id, email: user.email };

    }
}
