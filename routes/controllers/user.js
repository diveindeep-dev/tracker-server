import User from '../../models/User.js';
import { statusCode } from '../../config/index.js';
import { formattedToday } from '../../utils.js';

export const editProfile = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.user_id, {
      $set: {
        ...req.body,
      },
    });
    res.status(statusCode.OK).json({
      signInUser: {
        _id: user._id,
        name: user.name,
        profileId: user.profileId,
        emoji: user.emoji,
        color: user.color,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findOne(
      { profileId: req.params.profileId },
      'profileId name emoji color',
    )
      .populate({
        path: 'trackers',
        options: { sort: { _id: -1 } },
        populate: [
          { path: 'user', select: 'color emoji name profileId' },
          { path: 'schedules', select: 'isDone date' },
          { path: 'tags', select: 'text' },
        ],
      })
      .populate({
        path: 'schedules',
        select: 'date isDone',
        match: { date: formattedToday() },
        populate: [
          { path: 'tracker', select: 'text' },
          { path: 'cheers', select: 'color emoji name profileId' },
        ],
      });

    if (!user) {
      res.status(statusCode.OK).json({
        bio: null,
        trackers: [],
        schedules: [],
        isSigned: false,
      });
    } else {
      const isSigned = req.body.signed_id === user._id.toString();
      res.status(statusCode.OK).json({
        bio: {
          profileId: user.profileId,
          name: user.name,
          color: user.color,
          emoji: user.emoji,
        },
        trackers: user.trackers,
        schedules: user.schedules,
        isSigned,
      });
    }
  } catch (err) {
    next(err);
  }
};
