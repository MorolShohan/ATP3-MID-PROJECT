import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AdminEntity} from './entities/admin.entity';
import { AdminProfile } from './entities/adminprofile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from "@nestjs-modules/mailer";
import { ManagerEntity } from 'src/manager/manager.entity';



@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity,AdminProfile,ManagerEntity]),MailerModule.forRoot({
    transport: {
    host: 'smtp.gmail.com',
    port: 465,
    ignoreTLS: true,
    secure: true,
    auth: {
    user: 'shohanmorol123@gmail.com',
    pass: 'rrfektjltgbtzahy'
    },
    }})
    ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
