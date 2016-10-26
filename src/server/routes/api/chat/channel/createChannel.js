import Channel    from '../../../../models/Chat/Channel';
import ChannelPic from '../../../../models/Files/ChannelPic';
import {
  isValidImage,
  imageResizer,
  getImagesUrl
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

  let isImageValid = false;
  try {
    isImageValid = await isValidImage(avatar.path);
  } catch (e) {
    console.log(e);
    ctx.status = 500;
  }

  if (!isImageValid) {
    ctx.status = 400;
    ctx.body   = {
      status: 'error',
      message: `Avatar must be at least 250x250px and lower than 1024x1024px.`
    };
    return;
  }

  if (errors.length) {
    ctx.status = 400;
    ctx.body   = {
      status: 'error',
      message: `Channel must have ${errors.join(',')}.`
    };
    return;
  }

  data.users = [{
    info:    ctx.passport.user._id,
    isOwner: true
  }];
  data.title       = receivedData.title;
  data.description = receivedData.description || '';
  data.open        = typeof receivedData.open === 'boolean' ? receivedData.open : true;

  try {
    await imageResizer(avatar.filename, avatar.path);
  } catch (e) {
    console.log(e);
    ctx.status = 500;
  }

  let channelAvatar;
  try {
    const pic = new ChannelPic(getImagesUrl(avatar.filename));
    channelAvatar = await pic.save();
  } catch (e) {
    console.log(e);
    ctx.status = 500;
  }

  try {
    data.avatar = channelAvatar._id;
    const channel = new Channel(data);
    await channel.save();
  } catch (e) {
    console.log(e);
    ctx.status = 500;
  }

  ctx.status = 200;
  ctx.body   = { message: 'Channel successfully created.' };
}

export default createChannel;
