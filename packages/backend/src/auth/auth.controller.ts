import { Controller, Post, Body, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Response } from "express";
import { CreateUserDto } from "src/user/dto/create-user.dto";

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
}
