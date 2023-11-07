import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, CreateDateColumn } from 'typeorm';

@Entity('trm')
export class Trm {
@PrimaryGeneratedColumn()
id: number;
@Column({ type: 'decimal' })
amount: number;

@Column({ type: 'varchar' })
currency: string;

@CreateDateColumn({ type: 'timestamp' })
created_at: Date;

toJSON() {
  return {
    id: this.id,
    amount: this.amount,
    created_at: this.formatDate(this.created_at)
  };
}

private formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

}
