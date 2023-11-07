import { Merchant } from 'src/aliado/entities/merchant.entity';
import { Banco } from 'src/bancos/entities/banco.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn} from 'typeorm';
@Entity('dispersiones')
export class Dispersione {
   
    @PrimaryGeneratedColumn()
    id: number;
  

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    fechainicio: Date;

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    fechafin: Date;

  
    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    fechapago: Date;

  
    @Column({ type: 'varchar', length: 200 })
    banco: string;
       
    @Column({ type: 'varchar', length: 300})
    cuenta: string;

    @Column({ type: 'decimal' })
    valor: number;

    @Column({ type: 'varchar', length: 300})
    tipo: string;

    
    @Column({ type: 'bigint' })
    gmf: number;

    @Column({ type: 'varchar'})
    pais: string;

    @Column({ type: 'int',default:1})
    estado: number;
  
    @Column({ type: 'int'})
    merchant: number;
   
  /*   @ManyToOne(
        () => Aliado,
        (aliado) => aliado.uid
      )
      @JoinColumn({ name: 'merchant' })
      aliado: Aliado; */
}
