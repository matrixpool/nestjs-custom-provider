import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtConstant } from './jwt.constant';
import { SmsService } from './sms.service';

@Module({
  imports: [
      JwtModule.register({
      secret: JwtConstant.secret,
      signOptions: {expiresIn: '60h'}
    })],
    providers: [

    {
      provide: 'SMS_PROVIDER',
      useValue: SmsService
    },
    AuthService
  ],
  exports: ['SMS_PROVIDER', AuthService]
})
export class AuthModule {}
