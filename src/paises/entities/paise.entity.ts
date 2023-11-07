import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity('paises')
export class Paise {

    @PrimaryGeneratedColumn()
    uid: number;
  
    @Column({ type: 'varchar', length: 300 })
    nombre: string;
  

  

}
