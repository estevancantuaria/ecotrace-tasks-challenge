import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create_user.dto';
import { UpdateUserDto } from './dtos/update_user.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { signInDto } from './dtos/sign_user.dto';
import { UserResponseDto } from './dtos/user_response.dto';
import { ApiOperationCustom, AuthenticatedOperation, TaskIdParam } from './decorators/swagger_decorators';
import { 
  CREATE_USER_ANNOTATION,
  DELETE_USER_ANNOTATION,
  FIND_ALL_ANNOTATION,
  FIND_BY_ID_ANNOTATION,
  SIGN_IN_ANNOTATION,
  UPDATE_USER_ANNOTATION
} from './constants/decorators_swagger_annotations';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('register')
  @ApiOperationCustom(CREATE_USER_ANNOTATION)
  createUser(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.create(createUserDto);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiOperationCustom(SIGN_IN_ANNOTATION)
  signIn(@Body() signInDto: signInDto): Promise<UserResponseDto> {
    return this.usersService.signIn(signInDto);
  }

  @Get()
  @AuthenticatedOperation(FIND_ALL_ANNOTATION)
  findAll(@Query() paginationDto: PaginationDto): Promise<UserResponseDto[]> {
    return this.usersService.findAll(paginationDto);
  }

  @Get(':id')
  @TaskIdParam()
  @AuthenticatedOperation(FIND_BY_ID_ANNOTATION)
  findById(@Param('id') id: string): Promise<UserResponseDto> {
    return this.usersService.findById(id);
  }

  @Put(':id')
  @AuthenticatedOperation(UPDATE_USER_ANNOTATION)
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @AuthenticatedOperation(DELETE_USER_ANNOTATION)
  deleteUser(@Param('id') id: string): Promise<{ message: string }> {
    return this.usersService.delete(id);
  }
}
