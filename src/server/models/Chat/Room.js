import mongoose         from 'mongoose-fill';
import { modelCleaner } from '../../db/utils';

const ObjectId = mongoose.Schema.Types.ObjectId;

const RoomSchema = new mongoose.Schema({
  avatar: {
    type:     ObjectId,
    ref:      'RoomPics',
    required: false
  },
  title: {
    type:     String,
    required: true,
    trim:     true,
    default:  'Новая комната'
  },
  description: {
    type:     String,
    trim:     true
  },
  users: [{
    info: {
      type:     ObjectId,
      ref:      'User'
    },
    blocked: {
      type:     Boolean,
      default:  false
    },
    isModerator: {
      type:     Boolean,
      default:  false
    }
  }],
  messages: [{
    date: {
      type:     Date
    },
    author: {
      type:     ObjectId,
      ref:      'User'
    },
    content: {
      type:     String,
      trim:     true
    },
    attachments: {
      type:     [ObjectId],
      ref:      'Attachment'
    }
  }],
  statistics: {
    messagesCount: {
      type:    Number,
      default: 0
    }
  },
  settings: {
    private: {
      type:     Boolean,
      default:  false
    }
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

modelCleaner(RoomSchema);
export default mongoose.model('Room', RoomSchema);
