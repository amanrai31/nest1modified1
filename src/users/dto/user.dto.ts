import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class UserDto{                                                      // All these field required;

    @IsString()
    @IsNotEmpty()
    name:string;

    @IsEmail()
    email: string;

    @IsEnum(["INTERN", "ENGINEER", "ADMIN"],{
        message:"Role not matched"
    })
    role:"INTERN"| "ENGINEER"| "ADMIN";
}