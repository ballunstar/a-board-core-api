import { Body, Controller, HttpCode, Post, Req } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginUseCase } from 'src/modules/authentication/use-cases/login.use-case';
import { RESPONSE_MESSAGES } from 'src/common/constants/response-messages.constants';
import { LogoutUseCase } from 'src/modules/authentication/use-cases/logout.use-case';
import { RequestAuthenticated } from 'src/common/interfaces/request-authenticated-interface';
import { LoginWithEmailDto } from 'src/presentation/auth/dtos/login-with-email.dto';

@ApiTags('Authentication')
@Controller('users/auth')
export class UserAuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly logoutUseCase: LogoutUseCase,
  ) {}

  @Post('login')
  @ApiBody({ type: LoginWithEmailDto })
  @HttpCode(200)
  public async login(@Body() loginWithEmailDto: LoginWithEmailDto) {
    const data = await this.loginUseCase.execute(loginWithEmailDto);
    return {
      ...RESPONSE_MESSAGES.SUCCESS,
      data,
    };
  }

  @Post('logout')
  public async logout(@Req() req: RequestAuthenticated) {
    await this.logoutUseCase.execute(req.user.id);
    return {
      ...RESPONSE_MESSAGES.SUCCESS,
    };
  }

  // @Put('change/password')
  // public async changePassword(@Req() req: RequestAuthenticated, @Body() body: ChangePasswordDto) {
  //   const userId = req.user.id; // Extract from authenticated user session
  //   const data = await this.changePasswordUseCase.execute(userId, body);
  //   return {
  //     ...RESPONSE_MESSAGES.SUCCESS,
  //     data,
  //   };
  // }
}
