import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from 'src/auth/auth.service';
import { UserEntity } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CommentEntity } from './entity/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    private readonly userService: UserService,
  ) {}

  async createComment(
    { email }: JwtPayload,
    text: string,
  ): Promise<CommentEntity> {
    const author = await this.userService.getUserByEmail(email);
    const comment = this.commentRepository.create({ text, author });
    return await this.commentRepository.save(comment);
  }
}
