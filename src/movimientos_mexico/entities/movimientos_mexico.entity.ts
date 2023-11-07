import { hash } from "bcrypt";
import { BeforeInsert, Column, Decimal128, Entity, PrimaryGeneratedColumn } from "typeorm";
 @Entity({name: 'movimientosmexico'})
export class MovimientosMexico {
    @PrimaryGeneratedColumn()
    uid: number;

    @Column({unique:true})
    reference: string;

    @Column({ nullable:true })
    reference_pro: number; 

    @Column({ nullable:true })
    reference_pro2: string;

    @Column({type: 'text'})
    checkout: string;

    @Column()
    merchant_id: number;

    @Column()
    merchant_email: string;

    @Column()
    merchant_phone: string;

    @Column()
    merchant_logo: string;

    @Column()
    merchant_name: string;

    @Column({type: 'date'})
    expiration: Date;

    @Column()
    currency: string;

    @Column()
    amount: string;

    @Column()
    user_doc: string;

    @Column({ nullable:true })
    user_type: string; 

    @Column({type: 'text'})
    user_name: string;

    @Column({ nullable:true })
    user_phone: string;

    @Column({ nullable:true })
    user_email: string;

    @Column({ nullable:true })
    user_address: string;

    @Column({ nullable:true })
    user_typeuser: string;

    @Column({type:'char'})
    type_transaction: string;

    @Column()
    method: string;

    @Column("decimal",{ precision: 14, scale: 2})
    cost: number;

    @Column("decimal",{ precision: 14, scale: 2})
    iva: number;

    @Column({ nullable:true })
    user_bank: string;

    @Column({ nullable:true })
    user_type_account: string;

    @Column({ nullable:true })
    user_num_account: string;

    @Column({default:1})
    status: number;

    @Column({type: 'text',nullable:true})
    linkpro: string;

    @Column()
    notify: string;

    @Column({type:'char'})
    pagado: string;

    @Column({ nullable:true })
    returnUrl: string;

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    updated_at: Date;

}
