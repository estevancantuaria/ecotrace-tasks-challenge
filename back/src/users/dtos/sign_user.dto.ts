import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { SIGN_IN_DTO_API } from '../constants/dto_swagger_annotations';


export class signInDto {

    @ApiProperty({
        ...SIGN_IN_DTO_API.EMAIL,
    })
    @IsString() 
    @IsNotEmpty({ message: SIGN_IN_DTO_API.EMAIL.message })
    @IsEmail({}, { message: SIGN_IN_DTO_API.EMAIL.message })
    email: string;

    @ApiProperty({
        ...SIGN_IN_DTO_API.PASSWORD,
    })
    @IsString()
    @IsNotEmpty({ message: SIGN_IN_DTO_API.PASSWORD.message })
    password: string;
}