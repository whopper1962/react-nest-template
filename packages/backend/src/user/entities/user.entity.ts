import { VerificationCode } from "src/auth/entities/verification-code.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  profileImage: string;

  @Column({ type: "text", nullable: true })
  bio: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: "boolean" })
  isVerified: boolean;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => VerificationCode, (verificationCode) => verificationCode.user)
  verificationCodes: VerificationCode[];
}
