import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { RegistationUserDto } from './dto/registation-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(userDto: RegistationUserDto) {
    const user = await this.userRepository.create(userDto);
    return user;
  }

  async getByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async getByMyIdOrFail(userId: string): Promise<User> {
    const user = await this.userRepository.findByPk(userId);
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    return user;
  }

  async updateUser(userId: string, userDto: UpdateUserDto) {
    try {
      const [usersCount] = await this.userRepository.update(userDto, {
        where: { id: userId },
      });
      if (usersCount === 0) {
        throw new NotFoundException('Пользователь с таким ID не найден');
      }
      return userDto;
    } catch (e) {
      if (e.name === 'SequelizeUniqueConstraintError') {
        throw new ConflictException(
          'Пользователь с таким адресом электронной почты уже зарегистрирован',
        );
      } else if (e.name === 'SequelizeValidationError') {
        throw new BadRequestException('Переданы некорректные данные');
      } else {
        throw e;
      }
    }
  }
}
