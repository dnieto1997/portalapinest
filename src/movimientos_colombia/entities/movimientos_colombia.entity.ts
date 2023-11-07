import { hash } from "bcrypt";
import { BeforeInsert, Column, Decimal128, Entity, PrimaryGeneratedColumn } from "typeorm";


 @Entity({name: 'movimientoscol'}) 
export class MovimientosColombia {
    @PrimaryGeneratedColumn()
    uid: number;

    @Column({unique:true,nullable:true})
    reference: string;

    @Column({ nullable:true })
    reference_pro: number; 

    @Column({ nullable:true })
    reference_pro2: string;

    @Column({type: 'text',nullable:true})
    checkout: string;

    @Column({nullable:true})
    merchant_id: number;

    @Column({nullable:true})
    merchant_email: string;

    @Column({nullable:true})
    merchant_phone: string;

    @Column({nullable:true})
    merchant_logo: string;

    @Column({nullable:true})
    merchant_name: string;

    @Column({type: 'date',nullable:true})
    expiration: Date;

    @Column({nullable:true})
    currency: string;

    @Column({nullable:true})
    amount: string;

    @Column({nullable:true})
    user_doc: string;

    @Column({ nullable:true })
    user_type: string; 

    @Column({type: 'text',nullable:true})
    user_name: string;

    @Column({ nullable:true })
    user_phone: string;

    @Column({ nullable:true })
    user_email: string;

    @Column({ nullable:true })
    user_address: string;

    @Column({ nullable:true })
    user_typeuser: string;

    @Column({type:'char',nullable:true})
    type_transaction: string;

    @Column({ nullable:true })
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

    @Column({ nullable:true })
    notify: string;

    @Column({type:'char',nullable:true})
    pagado: string;

    @Column({ nullable:true })
    returnUrl: string;

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    updated_at: Date;
}
