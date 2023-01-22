import { PartialType } from "@nestjs/swagger";
import { CommentCreateDTO } from "./comment.create.dto";

export class CommentUpdateDTO extends PartialType(CommentCreateDTO) {}