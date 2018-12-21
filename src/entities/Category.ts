import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { Artical } from './Artical';

@Entity()
export class Category {
  @PrimaryGeneratedColumn("uuid")
  c_id: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  c_name: string;

  @Column({ type: "varchar", length: 200, nullable: false })
  c_description: string;
}
