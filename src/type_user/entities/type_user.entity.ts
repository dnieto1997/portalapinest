
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
@Entity('type_user')
export class TypeUser {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 255})
    description: string;
  

    @Column({ type: 'varchar', length: 255})
    name: string;




}
