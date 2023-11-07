
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'conf_refacil'}) 
export class ConfNequi {
    @PrimaryGeneratedColumn()
    uid: number;

    @Column({nullable:true})
    aliados: string;


    @Column({nullable:true})
    monto: number;

   
}
