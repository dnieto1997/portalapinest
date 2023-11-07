import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
@Entity('config')
export class Config {

    @PrimaryGeneratedColumn()
    log_id: number;
  
    @Column({ type: 'varchar', length: 500 })
    name: string;
  
    @Column({ type: 'varchar', length: 100 })
    type: string;
  
}
