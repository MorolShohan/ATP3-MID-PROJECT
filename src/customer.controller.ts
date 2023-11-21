import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Res, Session, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerInfo } from './customer.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { CustomerEntity } from './customer.entity';
import { SessionGuard } from './customer.guards';
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  getHello(): string {
    return "hello Mars";
  }

  @Get('index')
  @UseGuards(SessionGuard)
  getIndex(@Session() session) {
console.log(session.email);
    return this.customerService.getAll();
    
  }

@Get('/searchcustomerby/:id')
searchUserBy(@Param('id') userId:number): Promise<CustomerEntity> {
return this.customerService.getCustomerByID(userId);
}


@Get('/searchcustomerbyquery')
searchCustomerByQuery(@Query() myquery:object): object {
  return myquery;
}

@Get('/searchcustomerbyobject')
@UsePipes(new ValidationPipe())
searchCustomerByObject(@Body() myobject:CustomerInfo): object {
  return {"name":myobject.name};
}

@Post('upload')
@UseInterceptors(FileInterceptor('myfile',
{ fileFilter: (req, file, cb) => {
  if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
   cb(null, true);
  else {
   cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
   }
  },
  limits: { fileSize: 30000 },
  storage:diskStorage({
  destination: './upload',
  filename: function (req, file, cb) {
   cb(null,Date.now()+file.originalname)
  },
  })
}
  
))
uploadFile(@UploadedFile() file: Express.Multer.File) {
 console.log(file);
}


@Get('/getimage/:name')
 getImages(@Param('name') name:string, @Res() res) {
 res.sendFile(name,{ root: './upload' })
 }

@Post('addcustomer')
@UsePipes(new ValidationPipe())
@UseInterceptors(FileInterceptor('profilepic',
{ fileFilter: (req, file, cb) => {
  if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
   cb(null, true);
  else {
   cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
   }
  },
  limits: { fileSize: 30000 },
  storage:diskStorage({
  destination: './upload',
  filename: function (req, file, cb) {
   cb(null,Date.now()+file.originalname)
  },
  })
}
))
addCustomer(@Body() customerInfo:CustomerInfo, @UploadedFile()  myfile: Express.Multer.File) {
  customerInfo.filename = myfile.filename;
return this.customerService.addCustomer(customerInfo);
}

@Put('/update/:id')
updateCustomer(@Param('id') id:number, @Body() customerInfo:CustomerInfo)
{
  return this.customerService.updateCustomer(id,customerInfo);
}

@Post('/addmanager')
addManager(@Body() managerInfo)
{
return this.customerService.addManager(managerInfo);
}
@Get('getmanagers/:id')
getManagers(@Param('id') id:number)
{
return this.customerService.getManagers(id);
}
@Get('getcustomerbymanager/:id')
getCustomerByManager(@Param('id') id:number)
{
  return this.customerService.getCustomerByManager(id);
}

@Post('login')
async login(@Body() customerInfo:CustomerInfo, 
@Session() session)
{
 if(await this.customerService.login(customerInfo))
 {
  session.email=customerInfo.username;
  return true;
 }
 else
 {
  throw new HttpException('UnauthorizedException', 
  HttpStatus.UNAUTHORIZED); 

 }
}

@Get('logout/:id')
  logout(@Param('id') userId: string) {
    return this.customerService.logout(userId);
  }

@Delete('delete/:id')
  deleteCustomer(@Param('id') userId: string) {
    return this.customerService.deleteCustomer(userId);
  }

}
