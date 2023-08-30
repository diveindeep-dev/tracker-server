import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema(
  {
    date: { type: String, require: true },
    isDone: { type: Boolean, default: false, require: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
    tracker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tracker',
      require: true,
    },
    cheers: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] },
    ],
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

export default mongoose.model('Schedule', scheduleSchema);
