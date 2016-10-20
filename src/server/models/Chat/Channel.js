import mongoose         from 'mongoose-fill';
import { modelCleaner } from '../../db/utils';

const ObjectId = mongoose.Schema.Types.ObjectId;

const ChannelSchema = new mongoose.Schema({
  avatar: {
    type:     ObjectId,
    ref:      'ChannelPics',
    required: false
  },
  title: {
    type:     String,
    required: true,
    trim:     true,
    default:  'Новый чат'
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
    isAdmin: {
      type:     Boolean,
      default:  false
    },
    isModerator: {
      type:     Boolean,
      default:  false
    },
    isOwner: {
      type:     Boolean,
      default:  false
    }
  }],
  notifications: [{
    text: {
      type:     String
    },
    receiver: {
      type:     ObjectId,
      ref:      'User'
    },
    isRead: {
      type:     Boolean,
      default:  false
    }
  }],
  rooms: {
    type:     [ObjectId],
    ref:      'Room',
    default:  []
  },
  statistics: {
    messagesCount: {
      type:    Number,
      default: 0
    }
  },
  settings: {
    open: {
      type:     Boolean,
      default:  true
    }
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

modelCleaner(ChannelSchema);
export default mongoose.model('Channel', ChannelSchema);
