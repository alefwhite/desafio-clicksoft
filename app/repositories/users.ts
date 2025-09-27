import User from '#models/user'

export interface UserRepository {
  create(data: User): Promise<void>
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  findByRegistrationNumber(registrationNumber: number): Promise<User | null>
  update(
    id: string,
    data: { name: string; email: string; dateOfBirth: Date; registrationNumber: number }
  ): Promise<void>
  delete(id: string): Promise<void>
}

export class UserDatabase implements UserRepository {
  public async create(data: User): Promise<void> {
    await User.create(data)
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await User.findBy('email', email)
    return user
  }

  public async findById(id: string): Promise<User | null> {
    const user = await User.find(id)
    return user
  }

  public async findByRegistrationNumber(registrationNumber: number): Promise<User | null> {
    const user = await User.findBy('registration_number', registrationNumber)
    return user
  }

  public async update(
    id: string,
    data: { name: string; email: string; dateOfBirth: Date; registrationNumber: number }
  ): Promise<void> {
    await User.query().where('id', id).update({
      name: data.name,
      email: data.email,
      date_of_birth: data.dateOfBirth,
      registration_number: data.registrationNumber,
    })
  }

  public async delete(id: string): Promise<void> {
    await User.query().where('id', id).delete()
  }
}
