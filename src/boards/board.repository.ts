import { BoardStatus } from 'src/boards/board-stauts.enum';
import { Board } from 'src/boards/boards.entity';
import { CreateBoardDto } from 'src/boards/dto/create-board.dto';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;
    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    await this.save(board);
    return board;
  }
}
