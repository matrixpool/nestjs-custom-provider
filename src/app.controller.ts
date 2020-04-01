import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { SmsService } from './auth/sms.service';
import { JwtAuthGuard } from './jwt.guard';
import { Roles } from './role.decorator';
import { RoleAuthGuard } from './role.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly smsService: SmsService
    ) {}

  @Get()
  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Roles('admin')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('jwt')
  jwt(): Promise<string> {
    return this.authService.generateToken()
  }

  @Post('sms')
  sms(): Promise<any>{
    return this.smsService.send()
  }
}
