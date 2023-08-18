import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { User } from '../models/users';

declare global {
  namespace Express {
    interface Request {
      user?: InstanceType<typeof User> | undefined;
    }
  }
}

export const Protection = async (request: Request, response: Response, next: () => void) => {
  try {
    let token;
    if (request.headers.authorization && request.headers.authorization.startsWith('Bearer')) {
      // console.log('request.headers.authorization: ',request.headers.authorization);
      try {
        token = request.headers.authorization.split(' ')[1];
        const verifyToken = jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`) ;
        // console.log('verifyToken',verifyToken)
        if (verifyToken && typeof verifyToken !== 'string') {
          const foundUser = await User.findOne({ _id: verifyToken?.user_info?._id }).select('-password');
          request.user = foundUser !== null ? foundUser : undefined;
          // console.log('foundUser',foundUser);
        }
        next();
      } catch (error) {
        response.status(401).json({ msg: 'Not Authorized' });
      }
    }
    if (!token) {
      response.status(401);
      throw new Error('Not Authorized, And Token Not Found');
    }
  } catch (error) {
    response.status(401).json({ msg: 'Not Authorized, And Token Not Found' });
  }
};
