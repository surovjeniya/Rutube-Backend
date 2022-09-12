import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { hash } from 'bcryptjs';
import { Base } from 'src/util/base.util';

@Entity({ name: 'user' })
export class UserEntity extends Base {
  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 3);
  }

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: '' })
  avatar_path: string;

  @Column({ default: '' })
  name: string;

  @Column({ default: '', type: 'text' })
  description: string;

  videos: any;
  comments: any;
  likes: any;
  subscribers: any;
  subscriptions: any;
}
