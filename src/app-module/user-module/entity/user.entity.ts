import { AuthEntity } from 'src/auth-module/auth.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({
    unique: true,
  })
  email: string;

  @OneToOne(() => AuthEntity, { cascade: true })
  @JoinColumn()
  authentication: AuthEntity;

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
  updatet_at: Date;
}
