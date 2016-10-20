import compose    from 'koa-compose';
import convert    from 'koa-convert';
import logger     from 'koa-logger';
import cors       from 'koa-cors';
import bodyParser from 'koa-bodyparser';
import session    from 'koa-generic-session';
import koaQs      from 'koa-qs';
import pug        from 'js-koa-pug';

import corsConfig from './config';

export default function middleware(app) {
  koaQs(app, 'extended');
  return compose([
    logger(),
    pug(`${__dirname}/../views`),
    convert(cors(corsConfig)),
    convert(bodyParser()),
    convert(session())
  ]);
}
