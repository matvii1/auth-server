import { UserDto } from '../dtos'
import { prisma } from '../prisma'

class UserService {
  async getAllUsers() {
    const users = await prisma.user.findMany()

    const usersDto = users.map((user) => {
      return new UserDto(user)
    })

    return usersDto
  }
}

export default new UserService()
