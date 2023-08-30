import Schedule from '../../models/Schedule.js';
import { statusCode } from '../../config/index.js';
import User from '../../models/User.js';
import Tracker from '../../models/Tracker.js';
import { formattedToday } from '../../utils.js';

export const toggleDone = async (req, res, next) => {
  try {
    const toggled = await Schedule.findByIdAndUpdate(
      req.params.id,
      [
        {
          $set: { isDone: { $not: '$isDone' } },
        },
      ],
      { new: true },
    );

    const tracker = await Tracker.findById(toggled.tracker._id)
      .populate('user', 'color emoji name profileId')
      .populate('cheers', 'color emoji name profileId')
      .populate({
        path: 'schedules',
        options: { sort: { date: 1 } },
        select: 'date isDone',
        populate: [{ path: 'cheers', select: 'profileId emoji name color' }],
      });

    const result = await User.findById(toggled.user)
      .populate({
        path: 'schedules',
        select: 'date isDone',
        match: { date: formattedToday() },
        populate: [
          { path: 'tracker', select: 'text' },
          { path: 'cheers', select: 'profileId emoji name color' },
        ],
      })
      .populate({
        path: 'trackers',
        select: 'text url tags created_at',
        options: { sort: { _id: -1 } },
        populate: [
          { path: 'schedules', select: 'date isDone' },
          { path: 'user', select: 'profileId emoji name color' },
        ],
      });

    res.status(statusCode.OK).json({
      schedules: result.schedules,
      trackers: result.trackers,
      tracker: tracker,
    });
  } catch (err) {
    next(err);
  }
};

export const cheer = async (req, res, next) => {
  try {
    const cheered = await Schedule.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: {
          cheers: req.body.signedId,
        },
      },
      { new: true },
    );

    const tracker = await Tracker.findByIdAndUpdate(
      cheered.tracker._id,
      {
        $addToSet: {
          cheers: req.body.signedId,
        },
      },
      { new: true },
    )
      .populate('user', 'color emoji name profileId')
      .populate('cheers', 'color emoji name profileId')
      .populate({
        path: 'schedules',
        options: { sort: { date: 1 } },
        select: 'date isDone',
        populate: [{ path: 'cheers', select: 'profileId emoji name color' }],
      });

    const result = await User.findById(cheered.user).populate({
      path: 'schedules',
      select: 'date isDone',
      match: { date: formattedToday() },
      populate: [
        { path: 'tracker', select: 'text' },
        { path: 'cheers', select: 'prfileId emoji name color' },
      ],
    });

    res.status(statusCode.OK).json({
      schedules: result.schedules,
      tracker: tracker,
    });
  } catch (err) {
    next(err);
  }
};
