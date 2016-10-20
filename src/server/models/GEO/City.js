import mongoose                             from 'mongoose-fill';
import { modelCleaner, enableDeepPopulate } from '../../db/utils';

const ObjectId = mongoose.Schema.Types.ObjectId;

const CitySchema = new mongoose.Schema({
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
  region: {
    type:      Number,
    required:  true,
    ref:      'Region'
  },
  cityName: {
    type:      String,
    required:  true,
    trim:      true
  },
  slug: {
    type:      String,
    required:  true,
    trim:      true,
    lowercase: true
  },
  coords: {
    lat: {
      type:      Number,
      required:  true,
      trim:      true,
      uniq:      true
    },
    lng: {
      type:      Number,
      required:  true,
      trim:      true,
      uniq:      true
    }
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  },
  _id: false
});

modelCleaner(CitySchema);
enableDeepPopulate(CitySchema, mongoose);
export default mongoose.model('City', CitySchema);
