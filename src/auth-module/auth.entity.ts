import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

const randomString = Math.random().toString(36).substr(2, 5);

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
    default: "randomString"
  })
  verification_code: string;

  @Column({
    nullable: false,
  })
  provider_user_key: string;

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
}
