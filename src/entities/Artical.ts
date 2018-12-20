import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  artical_id: string;

  @Column({ type: "varchar", length: 200, nullable: false })
  title: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  description: string;

  @Column({ type: "blob" })
  content: string;

  @Column({ type: "bigint", default: 0 })
  likes: number;

  @Column({ type: "varchar" })
  images: string;

  @Column({ type: "varchar", nullable: false })
  user_id: string;

  @Column({ type: "bigint", default: 0 })
  read_num: number;

  @Column({type:"varchar", length:64})
  author: string

  @Column({ type: "tinyint", default: false })
  is_delete: boolean;
}
