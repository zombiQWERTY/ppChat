import { authenticate } from '../../auth';
import { uploader }     from '../../utils';

import createChannel    from './chat/channel/createChannel';

export default (router) => {
  router.post('/chat/channel', authenticate(), uploader().single('avatar'), createChannel);
};
