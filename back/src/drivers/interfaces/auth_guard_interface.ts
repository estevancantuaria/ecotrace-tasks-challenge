import { CanActivate } from "@nestjs/common";

export interface IAuthGuard extends CanActivate {
  sign(payload: any): Promise<string>;
}