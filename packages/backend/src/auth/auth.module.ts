import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
// import { MailerModule } from '@nestjs-modules/mailer';
import { User } from "src/user/entities/user.entity";
import { VerificationCode } from "./entities/verification-code.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, VerificationCode]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
    // MailerModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
