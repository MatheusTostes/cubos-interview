import { Injectable, NotFoundException } from '@nestjs/common'
import { UserRepository } from '../../shared/repositories/user.repository'

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async getProfile(userId: string) {
    const user = await this.userRepository.findUnique(userId, {
      id: true,
      email: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    })

    if (!user) {
      throw new NotFoundException('Usuário não encontrado')
    }

    return user
  }
}
