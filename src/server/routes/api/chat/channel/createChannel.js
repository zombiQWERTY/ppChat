import Channel from '../../../../models/Chat/Channel';
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
    // const channel = new Channel(data);
    // await channel.save();
    imageResizer(avatar.filename, avatar.path);


    ctx.status = 200;
    ctx.body   = { message: 'Channel successfully created' };
  } catch (e) {
    console.log(e);
  }
}

export default createChannel;
