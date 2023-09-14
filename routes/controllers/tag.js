import User from '../../models/User.js';
import Tag from '../../models/Tag.js';
import { statusCode } from '../../config/index.js';

export const getAll = async (req, res, next) => {
  try {
    const tags = await Tag.find({ 'trackers.0': { $exists: true } }, 'text')
      .sort({ updated_at: -1 })
      .limit(20);
    res.status(statusCode.OK).json({
      tags,
    });
  } catch (err) {
    next(err);
  }
};

export const getTrackerByTag = async (req, res, next) => {
  try {
    const tag = await Tag.findOne({ text: req.params.tag }).populate({
      path: 'trackers',
      select: 'text url tags created_at',
      options: { sort: { _id: -1 } },
      populate: [
        { path: 'schedules', select: 'date isDone' },
        { path: 'user', select: 'profileId emoji name color' },
        { path: 'tags', select: 'text' },
      ],
    });
    res.status(statusCode.OK).json({
      tag,
    });
  } catch (err) {
    next(err);
  }
};
