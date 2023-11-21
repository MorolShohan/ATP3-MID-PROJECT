import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  Session,
  UseGuards,
  Res,
  Header,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { HttpException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common/exceptions';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AdminDTO, AdminLoginDTO, AdminUpdateDTO } from './dto/create-admin.dto';
import { AdminService } from './admin.service';
import { SessionGuard } from './session.guard';
import { ManagerEntity } from 'src/manager/manager.entity';
import { AdminEntity } from './entities/admin.entity';
import { ManagerDTO, ManagerUpdateDTO } from 'src/manager/manager.dto';

@Controller("admin")
export class AdminController {
  constructor(private adminService: AdminService,
    
  ) { }
  @Get()
  sendMail(): void {
    return this.adminService.sendMail();
  }

  @Get('/index')
  getAdmin(): any {
    return this.adminService.getIndex();
  }
  
  @Get('/findadmin/:id')
 
  async getAdminByID(@Param('id', ParseIntPipe) id: number): Promise<AdminEntity> {
    const res = await this.adminService.getAdminByID(id);
        if (res !== null) {
            return await this.adminService.getAdminByID(id);
        }
        else {
            throw new HttpException("Admin not found", HttpStatus.NOT_FOUND);
        }
  }

  @Get('/findalladmin')
  @UseGuards(SessionGuard)
  getAdminByIDName(@Query() qry: any): any {
    return this.adminService.getAllAdmin();
  }

  @Get('/getadmin/:email')
  @UseGuards(SessionGuard)
  async getAdminByEmail(email: string): Promise<AdminEntity> {
      const res = await this.adminService.getAdminByEmail(email);
      if (res !== null) {
          return await this.adminService.getAdminByEmail(email);
      }
      else {
          throw new HttpException("Admin not found", HttpStatus.NOT_FOUND);
      }
  }
  // @Post('/addadmin')
  // @UsePipes(new ValidationPipe())
  // addAdmin(@Body() data: AdminDTO): object {
  //     return this.adminService.addAdmin(data);
  // }

  @Post('insertadmin')
  // @UseGuards(SessionGuard)
  @UseInterceptors(FileInterceptor('myfile',
  {storage:diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
      cb(null,Date.now()+file.originalname)
    }
  })
  }))
  insertAdmin(@Body() mydto:AdminDTO,@UploadedFile(  new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 160000000 }),
      new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
    ],
  }),) file: Express.Multer.File){
  
  mydto.filenames = file.filename;  
  return this.adminService.addAdmin(mydto);
  }

  @Put('/updateadmin/')
  // @UseGuards(SessionGuard)
  @UsePipes(new ValidationPipe())
  updateAdmin(@Session() session,@Body('name') name: string): any {
    return this.adminService.updateAdmin(name, session.email);
  }

  @Put('/updateadmin/:id')
    @UsePipes(new ValidationPipe())
    updateAdminbyID(@Param('id') id: number, @Body() data:AdminUpdateDTO ): object {
        return this.adminService.updateAdminById(id, data);
    }
    @Put('/updatemanager/:id')
    @UsePipes(new ValidationPipe())
    updateManagerById(@Param('id') id: number, @Body() data:ManagerUpdateDTO): object {
        return this.adminService.updateManagerById(id, data);
    }


  @Delete('/deleteadmin/:id')
  deleteAdminbyid(@Param('id', ParseIntPipe) id: number): any {
    return this.adminService.deleteAdminByID(id);
  }

  @Delete('/deletemanager/:id')
  deleteManagerByID(@Param('id', ParseIntPipe) id: number): any {
    return this.adminService.deleteManagerByID(id);
  }

  @Get('/getallmanagerwithadmin')
  getAllManagersWithAdmin(): Promise<ManagerEntity[]> {
      return this.adminService.getAllManagerswithadmin()
  }

    @Get('/findmanagersbyadmin/:id')
    @UseGuards(SessionGuard)
    getManagerByAdminID(@Param('id', ParseIntPipe) id: number): any {
      return this.adminService.getManagersByAdminID(id);
    }
    @Get('/getimage/:name')
    getImages(@Param('name') name, @Res() res) {
      res.sendFile(name,{ root: './uploads' })
    }
    @Get('/getallmanager')
    getAllManagers(): Promise<ManagerEntity[]> {
        return this.adminService.getAllManagers()
    }
    @Post('/addmanager')
    @UsePipes(new ValidationPipe)
    addManagers(@Body() manager:ManagerDTO) {
        console.log(manager);
        return this.adminService.insertManager(manager);
    }



@Post('/signup')
@UseInterceptors(FileInterceptor('myfile',
{storage:diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
    cb(null,Date.now()+file.originalname)
  }
})

}))
signup(@Body() mydto:AdminDTO,@UploadedFile(  new ParseFilePipe({
  validators: [
    new MaxFileSizeValidator({ maxSize: 16000000}),
    new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
  ],
}),) file: Express.Multer.File){

mydto.filenames = file.filename;  

return this.adminService.signup(mydto);

}

@Get('getimagebyadminid/:adminId')
async getimagebyid(@Param('adminId', ParseIntPipe) adminId: number, @Res() res) {
    const filename = await this.adminService.getimagebyadminid(adminId);
    res.sendFile(filename, { root: './uploads' })
}

  @Post('/signin')
  @UsePipes(new ValidationPipe())
async signin(@Session() session, @Body() mydto:AdminLoginDTO)
  {
    const res = await (this.adminService.signin(mydto));
if(res==true)
{
  session.email = mydto.email;
  return (session.email);
}
else
{
  throw new UnauthorizedException({ message: "invalid credentials" });
}
}
@Get('/signout')
signout(@Session() session)
{
  if(session.destroy())
  {
    return {message:"you are logged out"};
  }
  else
  {
    throw new UnauthorizedException("invalid actions");
  }
}



}
