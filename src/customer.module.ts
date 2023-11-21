import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from './customer.entity';
import { ManagerEntity } from 'src/manager/manager.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity, ManagerEntity])],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}