import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DB_CONNECTION } from 'src/common/constants/database.constant';
import { COMMENT } from 'src/common/constants/schema.constant';
import { User } from 'src/user/schemas/user.schema';
import { CommentCreateDTO } from '../dto/comment.create.dto';
import { CommentUpdateDTO } from '../dto/comment.update.dto';
import { CommentDocument } from '../schemas/comment.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(COMMENT)
    private readonly commentModel: Model<CommentDocument>,
  ) {}

  async create(
    user: User,
    commentDTO: CommentCreateDTO,
  ): Promise<CommentDocument> {
    const comment: CommentDocument = await this.commentModel.create({
      ...commentDTO,
      creator: user, //@TODO user to be replaced by organization
    });

    return comment;
  }

  async findAll(limit: number, skip: number): Promise<CommentDocument[]> {
    const comments: CommentDocument[] = await this.commentModel
      .find({})
      .limit(limit)
      .skip(skip)
      .sort('asc');

    return comments;
  }

  async getAllTotals(): Promise<number> {
    const total = await this.commentModel.find({}).count();

    return total;
  }

  async findOneById(commentId: string): Promise<CommentDocument> {
    const comment: CommentDocument = await this.commentModel.findById(
      commentId,
    );

    return comment;
  }

  async getTotal(search: string): Promise<number> {
    const total: number = await this.commentModel
      .find({ message: search })
      .count();

    return total;
  }

  async find(
    search: string,
    limit: number,
    skip: number,
  ): Promise<CommentDocument[]> {
    const comments: CommentDocument[] = await this.commentModel
      .find({ message: search })
      .limit(limit)
      .skip(skip)
      .sort('asc');

    return comments;
  }

  async update(
    commentDoc: CommentDocument,
    input: CommentUpdateDTO,
  ): Promise<CommentDocument> {
    const comment: CommentDocument = await this.commentModel.findByIdAndUpdate(
      commentDoc._id,
      input,
      { new: true },
    );

    if (!comment) throw new NotFoundException('Comment not found');

    return comment;
  }

  async delete(commentDoc: CommentDocument): Promise<CommentDocument> {
    const comment: CommentDocument = await this.commentModel.findByIdAndRemove(
      commentDoc._id,
    );

    if (!comment) throw new NotFoundException('Comment not found');

    return comment;
  }

  async active(commentDoc: CommentDocument): Promise<CommentDocument> {
    const comment: CommentDocument = await this.commentModel.findByIdAndUpdate(
      commentDoc._id,
      { isActive: true },
      { new: true },
    );

    if (!comment) throw new NotFoundException('Comment not found');

    return comment;
  }

  async inactive(commentDoc: CommentDocument): Promise<CommentDocument> {
    const comment: CommentDocument = await this.commentModel.findByIdAndUpdate(
      commentDoc._id,
      { isActive: false },
      { new: true },
    );

    if (!comment) throw new NotFoundException('Comment not found');

    return comment;
  }

  async softDelete(commentDoc: CommentDocument): Promise<CommentDocument> {
    const comment: CommentDocument = await this.commentModel.findByIdAndUpdate(
      commentDoc._id,
      { isDeleted: true },
      { new: true },
    );

    if (!comment) throw new NotFoundException('Comment not found');

    return comment;
  }
}

