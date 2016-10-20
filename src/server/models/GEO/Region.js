import mongoose                             from 'mongoose-fill';
import { modelCleaner, enableDeepPopulate } from '../../db/utils';

const ObjectId = mongoose.Schema.Types.ObjectId;

const RegionSchema = new mongoose.Schema({
  _id: {
    type:      Number,
    required:  true,
    uniq:      true
  },
  country: {
    type:     Number,
    required: true,
    ref:      'Country'
  },
  regionName: {
    type:      String,
    required:  true,
    trim:      true
  },
  slug: {
    type:      String,
    required:  true,
    trim:      true,
    lowercase: true
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  },
  _id: false
});

modelCleaner(RegionSchema);
enableDeepPopulate(RegionSchema, mongoose);
export default mongoose.model('Region', RegionSchema);
