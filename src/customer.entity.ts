import { ManagerEntity } from "src/manager/manager.entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("customer")
export class CustomerEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ name: "name", type: "character varying", })
    name: string;
    @Column()
    username: string;
    @Column()
    password: string;
    @Column()
    address: string;
    @Column()
    filename: string;

    @OneToMany(() => ManagerEntity, manager => manager.customer, { cascade: true })
     managers: ManagerEntity[];
    

}