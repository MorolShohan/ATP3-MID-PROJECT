import { IsEmail, IsEmpty, IsNotEmpty, IsString, Matches } from 'class-validator';
import { ManagerEntity } from 'src/manager/manager.entity';
import { IntegerType } from 'typeorm';

export class AdminDTO {
    id: number;
    @Matches(/^[a-zA-Z]+$/, { message: "enter a proper name" })
    @IsNotEmpty()
    fullname: string;
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    phone: string;
    @IsNotEmpty()
    password: string;
    @IsNotEmpty()
    filenames: string;

}
export class AdminLoginDTO {
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    password: string;
}


export class AdminUpdateDTO {
    id: number;
   
    
    fullname: string;
   
    email: string;
    
    phone: string;
    
    password: string;
    
    filenames: string;
}

