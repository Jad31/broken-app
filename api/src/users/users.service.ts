import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    // Seed initial data if no users exist
    this.seedInitialData();
  }

  private async seedInitialData() {
    const count = await this.usersRepository.count();
    if (count === 0) {
      const initialUsers = [
        { name: 'John Doe', score: 850 },
        { name: 'Jane Smith', score: 920 },
        { name: 'Bob Johnson', score: 750 },
        { name: 'Alice Brown', score: 880 },
        { name: 'Charlie Wilson', score: 800 },
      ];
      await this.usersRepository.save(initialUsers);
    }
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find({
      order: {
        score: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const result = await this.usersRepository.update(id, updateUserDto);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async updateScore(id: number, newScore: number): Promise<User> {
    const result = await this.usersRepository.update(id, { score: newScore });
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async remove(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
