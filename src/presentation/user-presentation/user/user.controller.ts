import { BadRequestException, Controller, Get, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RESPONSE_MESSAGES } from 'src/common/constants/response-messages.constants';
import { getUserContext } from 'src/common/utilities/request-context.utility';
import { GetUserUseCase } from 'src/modules/user/use-cases/get-user.use-case';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly getUserUseCase: GetUserUseCase) {}

  @Get('profile')
  @HttpCode(200)
  public async getProfile() {
    const userContext = getUserContext();
    const user = await this.getUserUseCase.execute(userContext.user.id);
    if (!user) throw new BadRequestException('No user found');
    return {
      ...RESPONSE_MESSAGES.SUCCESS,
      data: {
        ...user.toAPIResponse(),
      },
    };
  }
}
