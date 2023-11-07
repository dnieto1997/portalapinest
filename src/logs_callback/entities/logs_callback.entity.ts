
import {Column, Entity, PrimaryGeneratedColumn } from "typeorm";


 @Entity({name: 'logs_callback'}) 

export class LogsCallback {
    @PrimaryGeneratedColumn()
    uid: number;

    @Column({ nullable:true })
    reference: string;

    @Column({ nullable:true })
    referenceid: number; 

    @Column({ nullable:true })
    amount: number;

    @Column({ nullable:true })
    user_created: number;

    @Column()
    date_notify: string;

    @Column({ nullable:true })
    merchant_id: string;

    @Column({ nullable:true })
    merchant_name: string;

    @Column({ nullable:true })
    currency: string;

    @Column()
    url_callback: string;

    
    @Column()
    resp_callback: string;

    @Column({ nullable:true })
    status: string;


    @Column({ nullable:true })
    motivo: string; 

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    upload_support: Date;


    @Column({ nullable:true })
    json: string;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    last_uploadsupport: Date;


    @Column({ nullable:true })
   type_transaction: string;

   

}
