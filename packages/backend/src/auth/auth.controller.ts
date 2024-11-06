import { Controller, Post, Body, Res, Get, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Response } from "express";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { GetUser } from "./decorators/get-user.decorator";
import { User } from "src/user/entities/user.entity";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post("signup/verify")
  async verifyUser(@Body() { email, code }: { email: string; code: string }) {
    return this.authService.verifyUser(email, code);
  }

  @Post("signin")
  async signIn(
    @Body() { email, password }: { email: string; password: string },
    @Res() res: Response,
  ) {
    const { token } = await this.authService.signIn(email, password);
    res.cookie("token", token, { httpOnly: true });
    return res.send({ message: "Logged in successfully" });
  }

  @UseGuards(JwtAuthGuard)
  @Post("signout")
  async signOut(@Res() res: Response) {
    res.clearCookie("token", { httpOnly: true });
    return res.send({ message: "Logged out successfully" });
  }

  @UseGuards(JwtAuthGuard)
  @Get("user")
  async user(@GetUser() user: User) {
    return user;
  }
}
