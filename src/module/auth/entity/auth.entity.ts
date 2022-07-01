import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { genSalt, hash, compare } from 'bcrypt';
import { generate } from 'randomstring';

const randomString = generate({
  length: 6,
  charset: 'numeric',
});

@Entity('auth')
export class AuthEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  verified: boolean;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  verification_code: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  temp_verification_code: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  verification_code_expiry: number;

  @Column({
    type: 'integer',
    default: 0,
  })
  failed_attempts: number;

  @Column({
    type: 'boolean',
    default: false,
  })
  blocked: boolean;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  deleted: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  async hashPassword() {
    const salt = await genSalt(+process.env.SALT_LEN);
    this.password = await hash(this.password, salt);
    this.verification_code = await hash(randomString, salt);
    this.temp_verification_code = randomString;
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await compare(attempt, this.password);
  }

  async compareVerificationCode(verification_code: string): Promise<boolean> {
    return await compare(verification_code, this.verification_code);
  }
}
