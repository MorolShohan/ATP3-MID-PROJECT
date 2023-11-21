import { IsEmail, IsNotEmpty } from 'class-validator'


export class CustomerInfo{

    @IsNotEmpty({message: 'Please enter a valid name'}) 
name:string;
@IsEmail() @IsNotEmpty() 
username:string;
@IsNotEmpty() 
password:string;
@IsNotEmpty() 
address:string;
filename:string;
}


export class customerUpdateInfo{
    name:string;
    username:string;
    password:string;
    address:string;
    age:number;
    }