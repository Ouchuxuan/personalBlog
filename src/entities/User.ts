import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Artical } from './Artical';
@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "varchar",
    length: 200,
    nullable: false
  })
  username: string;

  @Column({
    type: "varchar",
    length: 200,
    nullable: false
  })
  loginname: string;

  @Column({ type: "int", width: 64 })
  phone: number;

  @Column("varchar", { length: 255 })
  email: string;

  @Column({ type: "tinyint", default: false })
  is_delete: boolean;

  @OneToMany(type => Artical, artical => artical.user)
  articals: Artical[];

}
