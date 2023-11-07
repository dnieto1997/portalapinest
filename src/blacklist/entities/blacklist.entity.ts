import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
@Entity('blacklist')
export class Blacklist {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 255})
    num_doc: string;
  
    @Column({ type: 'varchar', length: 200 })
    date: string;
  
    


}
