import { AuthGuard } from '@nestjs/passport';
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err, user, info) {
      console.log(err, user, '++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
    return user;
  }
}