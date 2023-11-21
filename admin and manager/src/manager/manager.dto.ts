import { IsNotEmpty, IsInt, Length, IsEmail } from "class-validator";

export class ManagerDTO {   
   

   @IsNotEmpty()
    name: string;
   
    @IsNotEmpty()
    @IsEmail() 
    email: string;

    @IsNotEmpty()
    @Length(3,8)
    password: string;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    adminid:number;
}

export class ManagerUpdateDTO {
   
    
    name: string;
   
    email: string;
    
    address: string;
    
    password: string;
    
   
}
