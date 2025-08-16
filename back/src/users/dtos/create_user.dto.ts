import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';


export class CreateUserDto {

    @ApiProperty({
        description: 'E-mail do usuário',
        example: 'usuario@example.com',
        format: 'email',
        minLength: 3,
    })
    @IsString()
    @IsEmail({}, { message: "O formato do e-mail está inválido" })
    email: string;

    @ApiProperty({
        description: 'Senha do usuário',
        example: 'Senha123',
        format: 'string',
    })
    @IsString()
    @MinLength(6, { message: "A senha precisa ter pelo menos 6 caracteres" })
    @MaxLength(50, { message: "A senha pode ter no máximo 50 caracteres" })
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'A senha precisa ter pelo menos uma letra maiúscula, uma letra minúscula e um número'
    })
    password: string;

    @ApiProperty({
        description: 'Nome do usuário',
        example: 'João da Silva',
        format: 'string',
    })
    @IsString()
    @MinLength(1, { message: "O nome precisa ter pelo menos uma letra" })
    name: string;

}