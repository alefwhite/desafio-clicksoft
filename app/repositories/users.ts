import User from '#models/user'

export interface UserRepository {
  create(data: User): Promise<User>
  findByEmail(email: string): Promise<User | null>
}

export class UserDatabase implements UserRepository {
  public async create(data: User): Promise<User> {
    const user = await User.create(data)
    return user
  }
  public async findByEmail(email: string): Promise<User | null> {
    const user = await User.findBy('email', email)
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
