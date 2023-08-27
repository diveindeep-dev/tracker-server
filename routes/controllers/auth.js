import User from '../../models/User.js';
import jwt from 'jsonwebtoken';
import { statusCode } from '../../config/index.js';

export const create = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    const user = await newUser.save();
    res.status(statusCode.CREATED).json({
      user,
    });
  } catch (err) {
    next(err);
  }
};

export const getToken = (req, res, next) => {
  try {
    const jwtToken = jwt.sign(req.user, process.env.JWT_SECRET, {
      expiresIn: '5d',
    });
    res.status(statusCode.OK).json({
      token: jwtToken,
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(
      req.authorizedUser._id,
      '_id profileId name color emoji',
    );
    res.status(statusCode.OK).json({
      signInUser: {
        _id: user._id,
        name: user.name,
        profileId: user.profileId,
        emoji: user.emoji,
        color: user.color,
      },
    });
  } catch (error) {
    next(error);
  }
};
