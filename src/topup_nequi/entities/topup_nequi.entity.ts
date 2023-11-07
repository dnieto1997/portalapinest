import { hash } from "bcrypt";
import { BeforeInsert, Column, Decimal128, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity({name: 'logs_nequi_topup'}) 
export class TopupNequi {

    @PrimaryGeneratedColumn()
    uid: number;

    @Column({ nullable: true, length: 1000, type: 'varchar' })
    respuesta: string;

    @Column({ nullable:true })
    date: string;

    @Column({ nullable:true })
    reference: string;

    @Column({ nullable:true })
    respmerchant: string;

    @Column({ nullable:true })
    status: string;

    @Column({ nullable:true })
    request: string;

   


}
