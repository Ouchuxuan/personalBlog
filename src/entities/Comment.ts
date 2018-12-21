import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  com_id: string;

  @Column({ type: "text", nullable: false })
  com_content: string;

  @Column({ type: "varchar", nullable: false })
  user_id: string;

  @Column({ type: "varchar", nullable: false })
  artical_id: string;

  @Column({ type: "varchar", nullable: false, default: "" })
  parent_id: string;
}
