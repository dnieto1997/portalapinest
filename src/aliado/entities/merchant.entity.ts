import { Dispersione } from 'src/dispersiones/entities/dispersione.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';


@Entity('aliado')
export class Merchant {

    @PrimaryGeneratedColumn()
    uid: number;
  
    @Column({ type: 'varchar', length: 300,default: null  })
    token: string;
  
    @Column({ type: 'varchar', length: 100, default: null })
    image: string;
  
    @Column({ type: 'varchar', length: 100 })
    merchant: string;
  
    @Column({ type: 'varchar', length: 100 })
    email: string;
  
    @Column({ type: 'varchar', length: 100 })
    phone: string;
       
    @Column({ type: 'varchar', length: 300,default: null })
    url_response: string;

    @Column({ type: 'decimal',  default: 450.00 })
    pse_fijo: number;

    @Column({ type: 'decimal',  default: 0.00 })
    pse_porcentaje: number;

    
    @Column({ type: 'decimal',  default: 450.00 })
    nequi_fijo: number;

    @Column({ type: 'decimal',  default: 0.80})
    nequi_porcentaje: number;

    @Column({ type: 'decimal',  default: 0.00 })
    cashout: number;
  
    @Column({ type: 'decimal',  default: 20.00 })
    wallet_cashin: number;
  
    @Column({ type: 'decimal',  default: 0.00 })
    wallet_cashout: number;
  
    @Column({ type: 'decimal',  default: 0.19 })
    iva: number;
  
    @Column({ type: 'int'})
    country: number;
    
    @Column({ type: 'int',default: 1 })
    banco: number;
  
    @Column({ type: 'int',default: 1 })
    status: number;
  
    @CreateDateColumn({ type: 'timestamp'})
    created_at: Date;
  
    @UpdateDateColumn({ type: 'timestamp'})
    updated_at: Date | null;

/*    @OneToMany(() => Dispersione, (dispersion) => dispersion.aliado)
    dispersion: Dispersione;
  */

}
