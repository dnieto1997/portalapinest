import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
  } from 'typeorm';


  @Entity({name: 'masiva'}) 
export class Masiva {
    @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar',{ length: 300, nullable: true })
  reference: string;

  @Column('varchar')
  status: string;

  @Column({ default: 0 })
  usuario: number;

  @Column({ default: 1 })
  msg: number;

  @CreateDateColumn({ type: 'timestamp' })
  fecha: string;

  @Column( 'varchar',{default:"0.0"})
  cost: string;

  @Column('varchar')
  iva: string;

  @Column('varchar')
  motivo: string;

  @Column('varchar')
  url_response: string;

  @Column('varchar',{ length: 255, nullable: true })
  currency: string;

  @Column('varchar',{ length: 255, nullable: true })
  amount: string;

  @Column({ default: 0 })
  mov_update: boolean;

  @Column('int',{ nullable: true })
  uid: number;

  @Column({ length: 255, nullable: true })
  provider: string;

  
}
