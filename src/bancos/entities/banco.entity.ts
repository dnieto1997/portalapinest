
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
@Entity('bancos')
export class Banco {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 255 })
    nombre: string;
  
    @Column({ type: 'varchar', length: 200 })
    cuenta: string;
  
    @Column({ type: 'int'})
    merchant: number;
       
    
}
