import { AuthCredentialsDto } from 'src/auth/dto/auth-credential.dto';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const user = this.create({
      username,
      password,
    });

    await this.save(user);
  }
}
