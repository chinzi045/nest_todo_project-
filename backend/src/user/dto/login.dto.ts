import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto{

  
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()


    email:string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password:string
}