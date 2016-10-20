import mongoose         from 'mongoose-fill';
import { modelCleaner } from '../../db/utils';

const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema({
  avatar: {
    type:     ObjectId,
    ref:      'UserPic',
    required: false
  },
  name: {
    type:     String,
    required: false,
    trim:     true,
    default:  'Аноним'
  },
  surname: {
    type:     String,
    required: false,
    trim:     true,
    default:  'Анонимный'
  },
  birthdate: {
    type:     Date,
    required: true
  },
  country: {
    type:     Number,
    required: true
  },
  region: {
    type:     Number,
    ref:      'Country',
    required: true
  },
  city: {
    type:     Number,
    ref:      'City',
    required: true
  },
  login: {
    type:      String,
    required:  true,
    trim:      true,
    unique:    true,
    sparse:    true
  },
  email: {
    type:      String,
    required:  true,
    lowercase: true,
    trim:      true,
    unique:    true,
    sparse:    true
  },
  password: {
    type:     String,
    required: true
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

modelCleaner(UserSchema);
export default mongoose.model('User', UserSchema);
