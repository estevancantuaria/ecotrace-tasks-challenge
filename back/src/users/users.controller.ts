import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create_user.dto';
import { UpdateUserDto } from './dtos/update_user.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { signInDto } from './dtos/sign_user.dto';
import { UserResponseDto } from './dtos/user_response.dto';
import { AuthenticatedOperation, TaskIdParam } from './decorators/swagger_decorators';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('register')
  @AuthenticatedOperation('Criar um novo usuário')
  createUser(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.create(createUserDto);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @AuthenticatedOperation('Fazer login')
  signIn(@Body() signInDto: signInDto): Promise<UserResponseDto> {
    return this.usersService.signIn(signInDto);
  }

  @Get()
  @AuthenticatedOperation('Listar todos os usuários')
  findAll(@Query() paginationDto: PaginationDto): Promise<UserResponseDto[]> {
    return this.usersService.findAll(paginationDto);
  }

  @Get(':id')
  @TaskIdParam()
  @AuthenticatedOperation('Buscar usuário por ID')
  findById(@Param('id') id: string): Promise<UserResponseDto> {
    return this.usersService.findById(id);
  }

  @Put(':id')
  @AuthenticatedOperation('Atualizar usuário')
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @AuthenticatedOperation('Deletar usuário')
  deleteUser(@Param('id') id: string): Promise<{ message: string }> {
    return this.usersService.delete(id);
  }
}
