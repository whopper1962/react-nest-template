import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { CurrentUserDto } from "src/user/dto/current-user.dto";

export const GetUser = createParamDecorator((_: unknown, ctx: ExecutionContext): CurrentUserDto => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
