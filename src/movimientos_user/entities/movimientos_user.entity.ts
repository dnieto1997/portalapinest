import {  Column,  Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'movimientos_user'})
export class MovimientosUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable:true })
    user: number;

    @Column({nullable:true})
    movimimiento: number; 

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    date: Date;

    @Column({ nullable:true })
    tipo: string;

    @Column({ nullable:true })
    status: number;
}
