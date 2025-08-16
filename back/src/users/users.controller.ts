import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create_user.dto';
import { UpdateUserDto } from './dtos/update_user.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { signInDto } from './dtos/sign_user.dto';
import { AuthGuard } from '../drivers/auth_guard';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { ApiOperation } from '@nestjs/swagger';
import { UserResponseDto } from './dtos/user_response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('register')
  @ApiOperation({ summary: 'Criar um novo usuário' })
  createUser(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.create(createUserDto);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Fazer login' })
  signIn(@Body() signInDto: signInDto): Promise<UserResponseDto> {
    return this.usersService.signIn(signInDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Listar todos os usuários' })
  findAll(@Query() paginationDto: PaginationDto): Promise<UserResponseDto[]> {
    return this.usersService.findAll(paginationDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiParam({
    name: 'id',
    description: 'UUID do usuário no banco de dados',
    type: 'string',
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @ApiOperation({ summary: 'Buscar usuário por ID' })
  findById(@Param('id') id: string): Promise<UserResponseDto> {
    return this.usersService.findById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Atualizar usuário' })
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Deletar usuário' })
  deleteUser(@Param('id') id: string): Promise<{ message: string }> {
    return this.usersService.delete(id);
  }
}
