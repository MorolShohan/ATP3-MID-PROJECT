import { Module } from '@nestjs/common';
import { ManagerController } from 'src/manager/manager.controller';
import { CustomerModule } from './customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [CustomerModule,
    TypeOrmModule.forRoot(
      { type: 'postgres',
       host: 'localhost',
       port: 5432,
       username: 'postgres',
       password: 'root',
       database: 'abc_ecommerce',
       autoLoadEntities: true,
       synchronize: true,
       } ),
      
  
  ],
  controllers: [ManagerController],
  providers: [],
})
export class AppModule {}