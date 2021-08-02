import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { genSalt, hash, compare } from 'bcrypt';
import { generate } from 'randomstring';
import * as jwt from "jsonwebtoken";
const randomString = generate({
  length: 64,
  charset: 'alphabetic'
});

@Entity('auth')
export class AuthEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  is_verified: Boolean;

  @Column({
    default: randomString
  })
  verification_code: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  is_del: Boolean;

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  async hashPassword() {
    const salt = await genSalt(+process.env.SALT_LEN);
    this.password = await hash(this.password, salt);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await compare(attempt, this.password);
  }
}
