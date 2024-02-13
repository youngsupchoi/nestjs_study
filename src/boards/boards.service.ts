import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { find } from 'rxjs';
import { User } from 'src/auth/user.entity';
import { BoardStatus } from 'src/boards/board-stauts.enum';
import { BoardRepository } from 'src/boards/board.repository';
import { Board } from 'src/boards/boards.entity';
import { CreateBoardDto } from 'src/boards/dto/create-board.dto';
import { Repository } from 'typeorm';
import { v1 as uuid } from 'uuid';
@Injectable()
export class BoardsService {
  constructor(
    // BoardRepository를 사용하기 위해 넣어야하는 코드
    @InjectRepository(Board)
    private boardRepository: BoardRepository,
  ) { }
  private boards: Board[] = [];

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Can't find board with id ${id}`);
    }

    return found;
  }

  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    const { title, description } = createBoardDto;
    const board = this.boardRepository.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
      user,
    });

    await this.boardRepository.save(board);
    return board;
  }

  async deleteBoardById(id: number, user: User): Promise<void> {
    const result = await this.boardRepository.delete({id, user});
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find board with id ${id}`);
    }
    console.log('result', result);
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);

    board.status = status;
    await this.boardRepository.save(board);
    return board;
  }

  async getAllBoards(user: User): Promise<Board[]> {
    const query = this.boardRepository.createQueryBuilder('board');
    query.where('board.userId = :userId', { userId: user.id });
    const boards = await query.getMany();
    return boards;
  }
}
