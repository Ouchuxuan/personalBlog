
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
      length: 100,
    })
    username: string;

    @Column({
      length:100,
    })
    loginname: string;

    @Column()
    phone: number;

    @Column({
      length:200,
    })
    email: string;

    @Column()
    isDel: boolean;
}