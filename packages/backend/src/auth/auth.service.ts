import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
// import { MailerService } from '@nestjs-modules/mailer';
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { User } from "src/user/entities/user.entity";
import { VerificationCode } from "./entities/verification-code.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(VerificationCode)
    private readonly verificationCodeRepository: Repository<VerificationCode>,
    private readonly jwtService: JwtService,
    // private readonly mailerService: MailerService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    const { password, ...userData } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      ...userData,
      isVerified: false,
      password: hashedPassword,
    });
    await this.userRepository.save(user);

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15);
    const verificationCode = this.verificationCodeRepository.create({
      user,
      code,
      expiresAt,
    });
    await this.verificationCodeRepository.save(verificationCode);

    // await this.mailerService.sendMail({
    //   to: user.email,
    //   subject: 'Verification Code',
    //   text: `Your verification code is: ${code}`,
    // });

    return { message: "Verification code sent to your email." };
  }

  async verifyUser(email: string, code: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    const verificationCode = await this.verificationCodeRepository.findOne({
      where: {
        user: { id: user.id },
      },
    });
    if (
      !verificationCode ||
      verificationCode.code !== code ||
      verificationCode.expiresAt < new Date()
    ) {
      throw new UnauthorizedException("Invalid or expired verification code");
    }

    user.isVerified = true;
    await this.userRepository.save(user);
    await this.verificationCodeRepository.delete(verificationCode.id);
    return { message: "Email verified successfully" };
  }

  async signIn(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email, isVerified: true } });
    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (!user || !passwordCorrect) {
      throw new UnauthorizedException("Invalid credentials");
    }
    const token = this.jwtService.sign({ userId: user.id });
    return { token };
  }
}
