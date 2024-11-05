import { IsEmail, IsNotEmpty, IsOptional, IsString, IsBoolean, MinLength } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  profileImage?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsBoolean()
  isVerified: boolean;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
