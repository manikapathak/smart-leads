import { User, IUser } from '../models/user.model';

interface CreateUserPayload {
  username: string;
  email: string;
  password_hash: string;
  name: string;
}

const userRepository = {
  async create({
    username,
    email,
    password_hash,
    name,
  }: CreateUserPayload) {
    const user = await User.create({
      username,
      email,
      password_hash,
      name,
    });

    return {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      name: user.name,
    };
  },

  async findByEmail(
    email: string
  ): Promise<IUser | null> {
    return await User.findOne({ email });
  },

  async findByUsername(
    username: string
  ): Promise<IUser | null> {
    return await User.findOne({ username });
  },

  async delete(id: string): Promise<void> {
    await User.findByIdAndDelete(id);
  },
};

export default userRepository;