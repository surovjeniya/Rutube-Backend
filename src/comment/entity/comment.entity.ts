import { UserEntity } from 'src/user/entity/user.entity';
import { Base } from 'src/util/base.util';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'comment' })
export class CommentEntity extends Base {
  @Column({ type: 'text' })
  text: string;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  @JoinColumn({ name: 'user_id' })
  author: UserEntity;

  video: any;
}
