import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminEntity } from "./entities/admin.entity";
import { AdminDTO,AdminLoginDTO,AdminUpdateDTO } from "./dto/create-admin.dto";
import * as bcrypt from 'bcrypt';
import { MailerService } from "@nestjs-modules/mailer/dist";
import { ManagerEntity } from "src/manager/manager.entity";
import { ManagerDTO, ManagerUpdateDTO } from "src/manager/manager.dto";
import { AdminProfile } from "./entities/adminprofile.entity";
@Injectable()
export class AdminService {
 
    constructor(
        @InjectRepository(AdminEntity)
        private adminRepo: Repository<AdminEntity>,
        @InjectRepository(ManagerEntity)
        private managerRepo: Repository<ManagerEntity>,
        @InjectRepository(AdminProfile)
        private adminprofileRepo:Repository<AdminProfile>,
        private mailerService: MailerService
      
        ) {}

        async getIndex(): Promise<AdminEntity[]> {
            return this.adminRepo.find();
        }
        async getAllAdmin(): Promise<AdminEntity[]> 
        {
            try{ return this.adminRepo.find();}
            catch (error)
            {
                throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
            }
        }

        async getAllManagers(): Promise<ManagerEntity[]> {
            return this.managerRepo.find();
        }
    
    

async getAdminByEmail(email: string): Promise<AdminEntity> {
    return this.adminRepo.findOneBy({ email: email });
}
async getAdminByID(id) {
    const data=await this.adminRepo.findOneBy({ id });
    console.log(data);
    if(data!==null) {
        return data;
    }
   else 
   {
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
   }

}

async getAdminbyIDAndName(id, name): Promise<AdminEntity> {
    return this.adminRepo.findOneBy({ id: id, fullname: name });
}



    async addAdmin(mydto) {
     const salt = await bcrypt.genSalt();
     const hassedpassed = await bcrypt.hash(mydto.password, salt);
     mydto.password= hassedpassed;
      return this.adminRepo.save(mydto);
     }

     async createAdmin(user: AdminEntity, userProfile: AdminProfile): Promise<AdminEntity> {
        userProfile.AdminEntity = user;
        await this.adminprofileRepo.save(userProfile);
        return this.adminprofileRepo.save(user);
        }

     async updateAdmin(email: string, data: AdminUpdateDTO): Promise<AdminEntity> {
        await this.adminRepo.update({ email: email }, data);
        return this.adminRepo.findOneBy({ id: data.id });
    }

     async updateAdminById(id: number, data: AdminUpdateDTO): Promise<AdminEntity> {
        await this.adminRepo.update(id, data);
        return this.adminRepo.findOneBy({ id });  
    }

    async updateManagerById(id: number, data: ManagerUpdateDTO): Promise<ManagerEntity> {
        await this.managerRepo.update(id, data);
        return this.managerRepo.findOneBy({ id });  
    }
    deleteAdminByID(id):any {
    
        return this.adminRepo.delete(id);
    }

    deleteManagerByID(id):any {
    
        return this.managerRepo.delete(id);
    }
    async deleteUser(id: number): Promise<AdminEntity[]> {
        await this.adminRepo.delete(id);
        return this.adminRepo.find();
    }

    async addManager(manager): Promise<ManagerEntity> {
        return this.managerRepo.save(manager);
    }

    // async insertManager(mydto:ManagerDTO):Promise<ManagerEntity> {
    
    //     return this.managerRepo.save(mydto);
    //        }

    // async insertManager(manager: ManagerDTO): Promise<ManagerEntity> {
    //     const createdManager = this.managerRepo.create(manager);
    //     return this.managerRepo.save(createdManager);
    //   }
    insertManager(mydto:ManagerDTO):any {
    
        return this.managerRepo.save(mydto);
           }
           getAdminByManagerID(id):any {
             return this.managerRepo.find({ 
                     where: {id:id},
                 relations: {
                     admin: true,
                 },
              });
         }
     

   


    getManagersByAdminID(id):any {
        return this.adminRepo.find({ 
                where: {id:id},
                relations: ['managers']
         });
    }
    async getAllManagerswithadmin(): Promise<ManagerEntity[]> {
        return this.managerRepo.find(
            {
                relations: {
                    admin: true
                }
            }
        );
    }
    
    
    async signup(data: AdminDTO): Promise<AdminEntity> {
        const salt = await bcrypt.genSalt();
        data.password = await bcrypt.hash(data.password, salt);
        return this.adminRepo.save(data);
    }

    async getimagebyadminid(adminid: number): Promise<string> {
        const mydata: AdminDTO = await this.adminRepo.findOneBy({ id: adminid });
        console.log(mydata);
        return mydata.filenames;
    }


async signin(mydto:AdminLoginDTO):Promise<boolean>{
   
    if (mydto.email != null && mydto.password != null) {
        const mydata = await this.adminRepo.findOneBy({ email: mydto.email });
        const isMatch = await bcrypt.compare(mydto.password, mydata.password);
        if (isMatch) {
            return true;
        }
        else {
            return false;
        }
    } else {
        return false;
    }
   
}

sendMail() : void {
      this.mailerService.sendMail({
        to: 'shohan.aiubcse@gmail.com', 
        from: 'shohanmorol123@gmail.com', 
        subject: 'Testing mailer',
        text: 'welcome', 
        html: '<b>welcome user</b>', 
      })
    }
}


