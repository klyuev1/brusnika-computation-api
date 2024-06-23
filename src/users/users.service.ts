import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./users.model";
import { RegistationUserDto } from "./dto/registation-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { RolesService } from "src/roles/roles.service";
import { Role } from "src/roles/roles.model";
import { addRoleDto } from "./dto/add-role.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private rolesService: RolesService
  ) {}

  async createUser(userDto: RegistationUserDto) {
    const user = await this.userRepository.create(userDto);
    const role = await this.rolesService.getRolesByValue("admin");
    await user.$set("roles", [role.id]);
    user.roles = [role];
    return user;
  }

  async getByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true }
    });
    return user;
  }

  async getAllUsers() {
    return this.userRepository.findAll({
      include: {
        model: Role,
        as: "roles",
        through: { attributes: [] }
      }
    });
  }

  async getByMyIdOrFail(userId: string): Promise<User> {
    const user = await this.userRepository.findByPk(userId);
    if (!user) {
      throw new NotFoundException("Пользователь не найден");
    }
    return user;
  }

  async updateUser(userId: string, userDto: UpdateUserDto) {
    try {
      const [usersCount] = await this.userRepository.update(userDto, {
        where: { id: userId }
      });
      if (usersCount === 0) {
        throw new NotFoundException("Пользователь с таким ID не найден");
      }
      return userDto;
    } catch (e) {
      if (e.name === "SequelizeUniqueConstraintError") {
        throw new ConflictException("Пользователь с таким адресом электронной почты уже зарегистрирован");
      } else if (e.name === "SequelizeValidationError") {
        throw new BadRequestException("Переданы некорректные данные");
      } else {
        throw e;
      }
    }
  }

  async addRole(dto: addRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.rolesService.getRolesByValue(dto.value);
    if (role && user) {
      await user.$add("role", role.id);
      return dto;
    }
    throw new HttpException("Пользователь или роль не найдены", HttpStatus.NOT_FOUND);
  }

  async deleteUser(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId }
    });
    if (!user) throw new NotFoundException("Пользователь не найден");
    await this.userRepository.destroy({ where: { id: userId } });
    return { message: "Пользователь удален" };
  }
}
