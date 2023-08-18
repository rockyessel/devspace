import { CookieOptions, Request, Response } from 'express';
import { generateToken } from '../utils/services';
import bcrypt from 'bcrypt';
import { User } from '../models/users';

interface ErrorProps extends Error {
  message: string;
}


export const register = async (request: Request, response: Response) => {
  try {
    const { username, email, password } = request.body;

    console.log(request.body);

    // @desc Checking if any of the request.body is an empty string
    if (!email || !username || !password || !request.body) {
      response.status(400).json({ msg: 'Please add all fields' });
    }

    // @desc **Checking if the user is/has already registered** //
    // @desc validation for already existing users
    const userExists = await User.findOne({ email });
    // @desc if user has already registered, throw a new error.

    if (userExists) {
      response.status(400).json({ msg: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // @desc creating a new user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const userWitNoPassword = {
      _id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updateAt: user.updatedAt,
    };
    

    const tokenObj = await generateToken('token', userWitNoPassword);

    if (tokenObj.error) {
      const { error } = tokenObj;
      return response.status(400).json({ error });
    }

    response.status(201).json(tokenObj);
  } catch (error) {
    const error_ = error as unknown as ErrorProps;
    response.status(500).json({ msg: error_.message });
  }
};

export const login = async (request: Request, response: Response) => {
  const { email } = request.body;

  if (!email) {
    response.status(400);
    throw new Error('Please add all fields');
  }

  const userExists = await User.findOne({ email }).select('-password');

  if (userExists !== null) {
    const userWitNoPassword = {
      _id: userExists._id,
      username: userExists.username,
      email: userExists.email,
      createdAt: userExists.createdAt,
      updateAt: userExists.updatedAt,
    };

    const tokenObj = await generateToken('token', userWitNoPassword);

    if (tokenObj.error) {
      const { error } = tokenObj;
      return response.status(400).json({ error });
    }

    response.json(tokenObj);
  }
};

export const refreshToken = async (request: Request, response: Response) => {
  const refreshTokenClient = request.body.refreshToken;


  console.log('refreshTokenClient', refreshTokenClient);

  if (!refreshTokenClient) {
    return response.sendStatus(401);
  }

  const tokenObj = await generateToken('refresh', undefined, refreshTokenClient);

  if (tokenObj.error) {
    const { error } = tokenObj;
    return response.status(400).json({ error });
  }

  return response.json(tokenObj);
};

export const logout = async (request: Request, response: Response) => {
  const refreshTokenClient = request.body.refreshToken;


  console.log('refreshTokenClient', refreshTokenClient);

  if (!refreshTokenClient) {
    return response.sendStatus(401);
  }

  const tokenObj = await generateToken('revoke', undefined, refreshTokenClient);

  if (tokenObj.error) {
    const { error } = tokenObj;
    return response.status(400).json({ error });
  }

  return response.json(tokenObj);
};