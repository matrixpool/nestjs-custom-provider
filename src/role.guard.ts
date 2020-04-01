import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleAuthGuard implements CanActivate {
  constructor(private _reflector: Reflector){}
  canActivate(context: ExecutionContext): boolean {
    const roles = this._reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }
    
    const request = context.switchToHttp().getRequest();
    const payload = request.user;

    console.log(payload, '+++++++++++++++++++++++++++')

    return roles.includes(payload.rl);
  }

}