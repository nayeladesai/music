import { CommentService } from './comment.service';
import { Body, Controller, Get ,Param,Post} from '@nestjs/common';
import { CommentDTO } from './dto/comment.dto';
import { ApiTags } from '@nestjs/swagger';
import { SuccessModel } from 'src/utils/sucess.response';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
    constructor(
        private commentService: CommentService
    ){}

    @Post()
    async addComment(
        @Body() data: CommentDTO,
    ): Promise<any>{
        return await this.commentService.addComment(data)
    }

    @Get(':id')
    async getComments(
        @Param('id') songId: number,
    ): Promise<any>{
        return await this.commentService.getComment(songId)
    }
}
