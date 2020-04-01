import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService){}

  async generateToken(): Promise<string> {
    const payload = {
      context: 'NESTJS'
    }

    return this.jwtService.sign(payload)

  }
}