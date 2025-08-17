import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { IHashService } from "./interfaces/hash_service_interface";

@Injectable()
export class BcryptDriver implements IHashService {
  async hash(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async compare(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }
}