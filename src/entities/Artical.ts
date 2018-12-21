import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable
} from "typeorm";
import { User } from "./User";
import { Category } from "./Category";

@Entity()
export class Artical {
  @PrimaryGeneratedColumn("uuid")
  artical_id: string;

  @Column({ type: "varchar", length: 200, nullable: false })
  title: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  description: string;

  @Column({ type: "text" })
  content: string;

  @Column({ type: "bigint", default: 0 })
  likes: number;

  @Column({ type: "bigint", default: 0 })
  read_num: number;

  @Column({ type: "varchar", length: 64 })
  author: string;

  @Column({ type: "tinyint", default: false })
  is_delete: boolean;

  @ManyToOne(type => User, user => user.articals)
  user: User;

  @ManyToMany(type => Category, {
    cascade: true
  })
  @JoinTable()
  categories: Category[];
}





