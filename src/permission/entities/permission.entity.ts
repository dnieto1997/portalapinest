

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
@Entity('permissions')
export class Permission {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 255 })
    posicion: string;
  
    @Column({ type: 'varchar', length: 200 })
    menu: string;
  
    @Column({ type: 'varchar', length: 200 })
    alias: string;

    @Column({ type: 'varchar', length: 200 })
    roles: string;
       
    @Column({ type: 'varchar', length: 200 })
    tipo: string;



}
