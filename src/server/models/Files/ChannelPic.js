import mongoose         from 'mongoose-fill';
import { modelCleaner } from '../../db/utils';

const ObjectId = mongoose.Schema.Types.ObjectId;

const ChanelPicSchema = new mongoose.Schema({
  original: {
    type:     String
  },
  small: {
    type:     String
  },
  medium: {
    type:     String
  },
  large: {
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

modelCleaner(ChanelPicSchema);
export default mongoose.model('ChannelPic', ChanelPicSchema);
