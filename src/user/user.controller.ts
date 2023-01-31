import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  Body,
  HttpStatus,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'Users in Database.',
  })
  async getUsers(@Res() res) {
    const users = await this.userService.getUsers();

    return res.status(HttpStatus.OK).send({
      message: 'Users In Database',
      users,
    });
  }

  @Get(':UserIdParam')
  @ApiResponse({
    status: 200,
    description: 'Searched User by ID.',
  })
  @ApiResponse({
    status: 406,
    description: 'The ID must be an legal ID User.',
  })
  async getUser(@Res() res, @Param('UserIdParam') userIdParam: string) {
    if (!userIdParam.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(HttpStatus.NOT_ACCEPTABLE).send({
        message: `The ID ${userIdParam} must be an legal ID User`,
      });
    }
    const user = await this.userService.getUsersById(userIdParam);
    if (!user) throw new NotFoundException('User Does not exists');
    return res.status(HttpStatus.OK).send({
      message: 'Searched User is :',
      user,
    });
  }

  @Post('/create')
  @ApiResponse({
    status: 200,
    description: 'The User has been succefully created.',
  })
  async createUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {
    const createUser = await this.userService.createUser(createUserDTO);
    return res.status(HttpStatus.OK).send({
      message: 'The User has been succefully created',
      createUser,
    });
  }

  @Put('/update/:UserIdParam')
  @ApiResponse({
    status: 200,
    description: 'User Edited Succefully.',
  })
  @ApiResponse({
    status: 406,
    description: 'User Does not exists in Database.',
  })
  async updateUserById(
    @Res() res,
    @Body() createUserDTO: CreateUserDTO,
    @Param('UserIdParam') UserIdParam: string,
  ) {
    const updateUser = await this.userService.updateUserById(
      createUserDTO,
      UserIdParam,
    );
    if (!updateUser) throw new NotFoundException('User Does not exists');
    return res.status(HttpStatus.OK).send({
      message: 'User Edited Succefully',
      updateUser,
    });
  }
  @Delete('/delete/:UserIdParam')
  @ApiResponse({
    status: 200,
    description: 'User Deleted Succefully.',
  })
  @ApiResponse({
    status: 406,
    description: 'User Does not exists in Database.',
  })
  async deleteUserById(@Res() res, @Param('UserIdParam') UserIdParam: string) {
    const deleteUser = await this.userService.deleteUserById(UserIdParam);

    if (!deleteUser) throw new NotFoundException('User Does not exists');
    return res.status(HttpStatus.OK).send({
      message: 'User Deleted succefully',
      deleteUser,
    });
  }
}
