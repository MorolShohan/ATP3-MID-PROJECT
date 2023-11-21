
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, 
    JoinColumn } from 'typeorm';
  import { AdminEntity } from './admin.entity';

@Entity("AdminProfile")
    export class AdminProfile {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    age: number;
    @Column()
    telephone: number;
    @OneToOne(() => AdminEntity, AdminEntity => AdminEntity.AdminProfile)
    AdminEntity: AdminEntity;
    }
