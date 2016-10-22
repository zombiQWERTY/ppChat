import Channel    from '../../../../models/Chat/Channel';
import ChannelPic from '../../../../models/Files/ChannelPic';
import {
  isValidImage,
  imageResizer
} from '../../../../utils';

/**
 * @api {post} /api/chat/channel Create channel
 * @apiName CreateChannel
 * @apiGroup Chat
 *
 * @apiParam {Buffer} avatar Channel avatar
 * @apiParam {String} title Channel title
 * @apiParam {String} description Channel description
 * @apiParam {Boolean} open Channel type
 *
 * @apiVersion 1.0.0
 */

async function createChannel(ctx, next) {
  if (!ctx.passport.user) {
    ctx.status = 401;
    return;
  }

  const receivedData = ctx.req.body;
  const data   = {};
  const errors = [];
  if (!receivedData.title) { errors.push('title'); }
  if (!ctx.req.file) { errors.push('avatar'); }

  const avatar = ctx.req.file;
  try {
    if (!isValidImage(avatar.path)) {
      ctx.status = 400;
      ctx.body   = {
        status: 'error',
        message: `Avatar must be at least 250x250px.`
      };
      return;
    }
  } catch (e) {
    console.log(e);
    ctx.status = 500;
  }

  if (errors.length) {
    ctx.status = 400;
    ctx.body   = {
      status: 'error',
      message: `Channel must have ${errors.join(',')}.`
    };
    return;
  }

  data.title       = receivedData.title;
  data.description = receivedData.description || '';
  data.open        = typeof receivedData.open === 'boolean' ? receivedData.open : true;

  try {
    const channel        = new Channel(data);
    const channelPicData = imageResizer(avatar.filename, avatar.path);
    const pic            = new ChannelPic(channelPicData);

    await Promise.all([channel.save(), pic.save()]);

    ctx.status = 200;
    ctx.body   = { message: 'Channel successfully created' };
  } catch (e) {
    console.log(e);
    ctx.status = 500;
  }
}

export default createChannel;
