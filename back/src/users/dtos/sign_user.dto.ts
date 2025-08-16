import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';


export class signInDto {

    @ApiProperty({
        description: 'E-mail do usuário',
        example: 'usuario@example.com',
        format: 'email',
        minLength: 3,
    })
    @IsString()
    @IsNotEmpty({ message: "O campo senha não pode ser vazio" })
    @IsEmail({}, { message: "O formato do e-mail está inválido" })
    email: string;

    @ApiProperty({
        description: 'Senha do usuário',
        example: 'Senha123',
        format: 'string',
    })
    @IsString()
    @IsNotEmpty({ message: "O campo senha não pode ser vazio" })
    @IsNotEmpty()
    password: string;
}