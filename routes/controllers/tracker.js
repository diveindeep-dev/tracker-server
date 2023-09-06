import Schedule from '../../models/Schedule.js';
import Tracker from '../../models/Tracker.js';
import User from '../../models/User.js';
import { statusCode } from '../../config/index.js';

export const create = async (req, res, next) => {
  try {
    const { text, user, schedule, url, tags } = req.body;
    const newTracker = new Tracker({ user, text, url, tags });
    const savedTracker = await newTracker.save();

    const savedSchedule = await Promise.all(
      schedule.map(async (time) => {
        const newSchedule = new Schedule({
          tracker: savedTracker._id,
          date: time,
          user: user,
        });
        const resSchedule = await newSchedule.save();
        return resSchedule._id;
      }),
    );

    await User.findByIdAndUpdate(user, {
      $push: { schedules: [...savedSchedule], trackers: savedTracker._id },
    });

    await Tracker.findByIdAndUpdate(
      savedTracker._id,
      {
        schedules: savedSchedule,
      },
      { new: true },
    );

    res.status(statusCode.CREATED).end();
  } catch (err) {
    next(err);
  }
};

export const getList = async (req, res, next) => {
  try {
    const page = req.params.page;
    const limit = 5;
    const trackers = await Tracker.find()
      .populate('user', 'color emoji name profileId')
      .populate('schedules', 'isDone date')
      .populate('cheers', 'color emoji name profileId')
      .sort({ created_at: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(statusCode.OK).json({
      trackers,
    });
  } catch (err) {
    next(err);
  }
};

export const getTracker = async (req, res, next) => {
  try {
    const id = req.params.id;
    const tracker = await Tracker.findById(id)
      .populate('user', 'color emoji name profileId')
      .populate('cheers', 'color emoji name profileId')
      .populate({
        path: 'schedules',
        options: { sort: { date: 1 } },
        select: 'date isDone',
        populate: [{ path: 'cheers', select: 'profileId emoji name color' }],
      });

    res.status(statusCode.OK).json({
      tracker,
    });
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    const target = await Tracker.findByIdAndDelete(req.params.id);
    const deletedSchedules = target.schedules;
    await Schedule.deleteMany({ tracker: req.params.id });
    await User.findOneAndUpdate(
      { trackers: req.params.id },
      {
        $pull: {
          trackers: req.params.id,
          schedules: { $in: deletedSchedules },
        },
      },
    );

    res.status(statusCode.NO_CONTENT).end();
  } catch (err) {
    console.log(err);
    next(err);
  }
};
