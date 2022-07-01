import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { sign } from 'jsonwebtoken';
import { env } from 'process';
import { AuthEntity } from '../../auth/entity/auth.entity';

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
  deleted: Boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  toResponseObject(showToken: boolean = true): UserRO {
    const { id, email, created_at, updated_at } = this;
    const responseObject: UserRO = {
      id,
      email,
      created_at,
      updated_at,
    };

    if (showToken) {
      responseObject.token = this.token;
    }

    return responseObject;
  }

  private get token(): string {
    const { id, email, authentication: { verified } } = this;

    return sign(
      {
        id,
        email,
        verified,
      },
      env.JWT_SECRET,
      { expiresIn: '7d' },
    );
  }
}

export class UserRO {
  id: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  token?: string;
}
