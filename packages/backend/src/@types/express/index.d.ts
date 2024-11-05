import { CurrentUserDto } from "src/user/dto/current-user.dto";

declare module "express" {
  export interface Request {
    user?: CurrentUserDto;
  }
}
