import mongoose         from 'mongoose-fill';
import { modelCleaner } from '../../db/utils';

const ObjectId = mongoose.Schema.Types.ObjectId;

const AttachmentSchema = new mongoose.Schema({
  url: {
    type:     String
  },
  contentType: {
    type:     String
  },
  filename: {
    type:     String
  },
  size: {
    type:     Number
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

modelCleaner(AttachmentSchema);
export default mongoose.model('Attachment', AttachmentSchema);
