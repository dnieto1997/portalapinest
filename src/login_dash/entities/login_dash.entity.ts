import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { hash } from 'bcrypt';

@Entity('login_dash')
export class LoginDash {
  
    @PrimaryGeneratedColumn()
  log_id: number;

  @Column({ type: 'varchar', length: 100 })
  log_merchantid: string;

  @Column({ type: 'varchar', length: 100 })
  log_usuario: string;

  @Column({ type: 'varchar', length: 100})
  log_clave: string;

  @Column({ type: 'varchar', length: 4, default: 'MA' })
  log_tipo: string;

  @Column({ type: 'decimal', default: 0.00 })
  cashout: number;

  @Column({ type: 'varchar' })
  log_pais: string;

  @Column({ type: 'char', length: 1, default: '1' })
  log_estado: string;

  @Column({ type: 'boolean', default: false })
  trm: boolean;




  @BeforeInsert()
    async hashPassword(){
        this.log_clave = await hash(this.log_clave, Number(process.env.HASH_SALT));
    }
}
