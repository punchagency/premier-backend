import mongoose from 'mongoose';

const userCardSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  cmsId: [{
    type: String,
    required: true,
  }],
}, { timestamps: true });

const UserCard = mongoose.models.usersaveds || mongoose.model('usersaveds', userCardSchema);
export default UserCard;