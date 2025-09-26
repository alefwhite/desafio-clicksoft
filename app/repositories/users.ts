import User from '#models/user'

export interface UserRepository {
  create(data: User): Promise<User>
}

export class UserDatabase implements UserRepository {
  public async create(data: User): Promise<User> {
    const user = await User.create(data)
    return user
  }

  // public async findById(id: string): Promise<User | null> {
  //   // Lógica para encontrar um usuário pelo ID
  // }

  // public async update(id: string, data: UpdateUserDTO): Promise<User | null> {
  //   // Lógica para atualizar um usuário
  // }

  // public async delete(id: string): Promise<void> {
  //   // Lógica para deletar um usuário
  // }
}
