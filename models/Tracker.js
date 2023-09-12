import mongoose from 'mongoose';

const trackerSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: { type: String, require: true },
    url: { type: String },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag', default: [] }],
    schedules: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Schedule', default: [] },
    ],
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

export default mongoose.model('Tracker', trackerSchema);
