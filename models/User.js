import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    profileId: { type: String, reqire: true },
    name: { type: String, reqire: true },
    password: { type: String, require: true },
    color: { type: String, require: true },
    emoji: { type: String, require: true },
    trackers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tracker' }],
    followings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    schedules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Schedule' }],
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

userSchema.pre('save', function (next) {
  const user = this;
  if (user.isModified('password')) {
    bcrypt.hash(user.password, 10, function (err, hashed) {
      if (err) return next(err);
      user.password = hashed;
      next();
    });
  } else {
    next();
  }
});

export default mongoose.model('User', userSchema);
