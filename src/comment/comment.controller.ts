import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtPayload } from 'src/auth/auth.service';
import { User } from 'src/decorator/user.decorator';
import { AuthGuard } from 'src/guard/auth.guard';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard)
  @Post()
  createComment(@Body('text') text: string, @User() user: JwtPayload) {
    return this.commentService.createComment(user, text);
  }
}
