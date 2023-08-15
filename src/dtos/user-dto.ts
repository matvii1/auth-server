import { User } from '@prisma/client'

export class UserDto {
  email: string
  isActivated: boolean
  id: string

  constructor(model: User) {
    this.email = model.email
    this.id = model.id
    this.isActivated = model.activated
  }
}
