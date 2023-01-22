import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { CommentDocument } from "../schemas/comment.schema";
import { CommentService } from "../services/comment.service";

@Injectable()
export class CommentPutToRequestGuard implements CanActivate {
    constructor(private readonly commentService: CommentService) {}
    
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { params } = request;

        const check: CommentDocument = await this.commentService.findOneById(params.id);

        request.__comment = check;

        return true;
    }
}