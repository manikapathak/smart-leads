import bcrypt from 'bcrypt'

import {signToken} from '../utils/jwt'

import userRepository from '../repositories/user.repository'

import { validate } from '../utils/validator.util';

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  name: string;
}

interface LoginPayload {
  username: string;
  password: string;
}

const authService = {
    async register({
    username,
    email,
    password,
    name,
  }: RegisterPayload) {
    let user: any;

    try {

      const { isValid, errors } = validate({
        username,
        email,
        password,
        name,
      });

      if (!isValid) {
        const error: any = new Error('Validation failed');
        error.validationErrors = errors;
        error.status = 400;
        throw error;
      }

      const existingEmail = await userRepository.findByEmail(email);

      if (existingEmail) {
        throw new Error('Email is already registered');
      }

      const existingUsername = await userRepository.findByUsername(username);

      if (existingUsername) {
        throw new Error('Username is already taken');
      }

      const password_hash = await bcrypt.hash(
        password,
        10
      );

      user = await userRepository.create({
        username,
        email,
        password_hash,
        name,
      });

      const accessToken = signToken(
        {
          id: user.id,
          username: user.username,
        },
      );

      return {
        user,
        token: accessToken,
      };

    } catch (error: any) {

      if (user && user.id) {
        await userRepository.delete(user.id);
      }

      throw new Error(error.message || 'Registration failed');
    }
  },

  async login({ username, password }: LoginPayload) {

    const user = await userRepository.findByUsername(username);
    console.log(user);

    if (!user) {
      throw new Error('Invalid username or password');
    }

    const validPassword = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!validPassword) {
      throw new Error('Invalid username or password');
    }

    const safeUser = {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        username: user.username,
        role: user.role
    };


    const accessToken = signToken(
      {
        id: safeUser.id,
        username: safeUser.username,
        role: safeUser.role
      }
    );

    return {
      user: safeUser,
      token: accessToken,
    };
  },
};

export default authService;