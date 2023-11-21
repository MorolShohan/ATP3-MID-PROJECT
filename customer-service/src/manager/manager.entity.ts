import { CustomerEntity } from "src/customer.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity("manager")
export class ManagerEntity
{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name:string;
    @Column()
    username:string;

    @ManyToOne(() => CustomerEntity, customer => customer.managers)
    customer: CustomerEntity;

}