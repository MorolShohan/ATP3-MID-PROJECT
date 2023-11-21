import { ManagerEntity } from 'src/manager/manager.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { AdminProfile } from './adminprofile.entity';
@Entity("Admin")
export class AdminEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ name: 'fullname', type: "varchar", length: 150 })
    fullname: string;
    @Column({ type: "varchar", length: 150 })
    email: string;
    @Column()
    phone: string;
    @Column()
    password: string;
    @Column()
    filenames: string;

    
  @OneToMany(() => ManagerEntity, (manager) => manager.admin)
  managers: ManagerEntity[]

    

    @OneToOne(() => AdminProfile, AdminProfile => AdminProfile.AdminEntity, { cascade: true
    })
    @JoinColumn()
    AdminProfile : AdminProfile;
    


}



