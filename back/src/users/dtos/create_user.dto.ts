import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { CREATE_USER_DTO_API } from '../constants/dto_swagger_annotations';


export class CreateUserDto {

    @ApiProperty({
        ...CREATE_USER_DTO_API.EMAIL,
    })
    @IsString()
    @IsEmail({}, { message: CREATE_USER_DTO_API.EMAIL.message })
    email: string;

    @ApiProperty({
        ...CREATE_USER_DTO_API.PASSWORD,
    })
    @IsString()
    @MinLength(CREATE_USER_DTO_API.PASSWORD.minLength, { message: CREATE_USER_DTO_API.PASSWORD.minlengthMessage })
    @MaxLength(CREATE_USER_DTO_API.PASSWORD.maxLength, { message: CREATE_USER_DTO_API.PASSWORD.maxlengthMessage })
    @Matches(
        CREATE_USER_DTO_API.PASSWORD.matches, {
        message: CREATE_USER_DTO_API.PASSWORD.message
    })
    password: string;

    @ApiProperty({
        ...CREATE_USER_DTO_API.NAME,
    })
    @IsString()
    @MinLength(CREATE_USER_DTO_API.NAME.minLength, { message: CREATE_USER_DTO_API.NAME.message })
    name: string;

}