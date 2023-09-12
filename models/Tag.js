import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema(
  {
    text: { type: String, require: true },
    trackers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tracker',
        default: [],
      },
    ],
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

export default mongoose.model('Tag', tagSchema);
