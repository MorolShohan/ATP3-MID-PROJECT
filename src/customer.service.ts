import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from './customer.entity';
import { Repository } from 'typeorm';
import { CustomerInfo } from './customer.dto';
import { ManagerEntity } from 'src/manager/manager.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntity) 
    private customerRepo: Repository<CustomerEntity>,

    @InjectRepository(ManagerEntity) 
    private managerRepo: Repository<ManagerEntity>
  )
  {}
  getAll(): Promise<CustomerEntity[]> {
    return this.customerRepo.find(
      {
        select:{
          name: true,
          username: true
        
        }
        
      }
    );
  }

getCustomerByID(id:number): Promise<CustomerEntity> {
return this.customerRepo.findOneBy({id:id});
}

 async addCustomer(customerInfo:CustomerInfo):Promise<CustomerEntity[]>
  {
    const password = customerInfo.password;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    customerInfo.password = hashedPassword;
   const res = await this.customerRepo.save(customerInfo);
   return this.customerRepo.find();
  }

  updateCustomer(id:number, customerInfo:CustomerInfo):Promise<CustomerEntity>
  {
   const res=  this.customerRepo.update(id,customerInfo);

     return this.customerRepo.findOneBy({id});
  }

  addManager(managerInfo)
  {
return this.managerRepo.save(managerInfo);
  }

getManagers(id:number)
{
 return this.customerRepo.find(
    {
      where: {id:id},
      relations: {managers:true}

    }
  )
}
getCustomerByManager(id:number)
{
return this.managerRepo.find(
  {
    where: {id:id},
    relations: {customer:true}

  }

)

}
async login(customerInfo:CustomerInfo)
{
  const customer = 
  await this.customerRepo.findOneBy({username:customerInfo.username});
  const result = 
  await bcrypt.compare(customerInfo.password, customer.password);
if(result)
{
  return true;
}
else{
  return false;
}

}
logout(customerId: string): string {
  return 'Logout successful';
}
deleteCustomer(customerId: string): string {
  return 'User deleted successfully';
}
}