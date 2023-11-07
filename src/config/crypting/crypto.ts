import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { compareSync, hashSync } from 'bcrypt';
import * as CryptoJs from 'crypto-js';

@Injectable()
export class CryptoService {
  constructor(private config: ConfigService) {}

  hash(value: string): string {
    return hashSync(value, 10);
  }

  hashCompare(value: string, encrypted: string): boolean {
    return compareSync(value, encrypted);
  }

  encrypt(str: string) {
    console.log("STR -> ", str);
    console.log("config secret get -> ", this.config.get('auth.secret'))
    return CryptoJs.AES.encrypt(str, this.config.get('auth.secret')).toString();
  }

  decrypt(encrypted: string) {
    return CryptoJs.AES.decrypt(encrypted, this.config.get('auth.secret')).toString(CryptoJs.enc.Utf8);
  }
}
