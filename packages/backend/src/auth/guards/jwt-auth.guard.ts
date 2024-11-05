// jwt-auth.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Request } from "express";
import { CurrentUserDto } from "src/user/dto/current-user.dto";
import { User } from "src/user/entities/user.entity";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies["token"];

    if (!token) {
      throw new UnauthorizedException("No token found");
    }

    try {
      const payload = this.jwtService.verify(token);
      const user = await this.userRepository.findOne({
        where: { id: payload.userId },
        select: ["id", "name", "email"], // 必要なフィールドだけを取得
      });

      if (!user) {
        throw new UnauthorizedException("User not found");
      }

      const userSummary: CurrentUserDto = {
        id: user.id,
        username: user.name,
        email: user.email,
        profileImage: user.profileImage || null,
      };
      request.user = userSummary;
      return true;
    } catch (error) {
      throw new UnauthorizedException("Invalid token");
    }
  }
}
