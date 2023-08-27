import User from '../../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { statusCode } from '../../config/index.js';

export const registerValidation = async (req, res, next) => {
  try {
    const { profileId } = req.body;
    const isUser = await User.findOne({ profileId: profileId });
    if (isUser) {
      return res.status(statusCode.BAD_REQUEST).json({
        message: '이미 존재하는 계정입니다.',
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const signInValidation = async (req, res, next) => {
  try {
    const { profileId, password } = req.body;
    const user = await User.findOne({ profileId });
    if (!user) {
      return res.status(statusCode.UNAUTHORIZED).json({
        message: '아이디 혹은 비밀번호를 정확하게 입력하세요.',
      });
    }

    const isCorrectPassword = await comparePassword(password, user.password);
    if (!isCorrectPassword) {
      return res.status(statusCode.UNAUTHORIZED).json({
        message: '비밀번호를 정확하게 입력하세요.',
      });
    } else {
      req.user = { _id: user._id };
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const verifyToken = (req, res, next) => {
  const headerToken = req.headers.authorization;
  const bearer = headerToken.split(' ');
  const token = bearer[1];

  try {
    if (token === 'null') {
      return req.status(statusCode.FORBIDDEN).json({ message: '토큰 없음' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, authorized) => {
      if (err) {
        return res.status(statusCode.FORBIDDEN).json({ message: '토큰 오류' });
      } else {
        req.authorizedUser = authorized;
      }
    });
    next();
  } catch (error) {
    next(error);
  }
};
