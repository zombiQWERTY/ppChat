import mongoose         from 'mongoose-fill';
import { modelCleaner } from '../../db/utils';

const ObjectId = mongoose.Schema.Types.ObjectId;

const UserPicSchema = new mongoose.Schema({
  original: {
    type:     String
  },
  small: {
    type:     String
  },
  medium: {
    type:     String
  },
  thumbnail: {
    type:     String
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

modelCleaner(UserPicSchema);
export default mongoose.model('UserPic', UserPicSchema);
