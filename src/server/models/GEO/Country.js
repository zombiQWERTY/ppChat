import mongoose                             from 'mongoose-fill';
import { modelCleaner, enableDeepPopulate } from '../../db/utils';

const ObjectId = mongoose.Schema.Types.ObjectId;

const CountrySchema = new mongoose.Schema({
  _id: {
    type:      Number,
    required:  true,
    uniq:      true
  },
  countryName: {
    type:      String,
    required:  true,
    trim:      true,
    uniq:      true
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

modelCleaner(CountrySchema);
enableDeepPopulate(CountrySchema, mongoose);
export default mongoose.model('Country', CountrySchema);
