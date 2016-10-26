import bcrypt from 'bcrypt-nodejs';
import multer from 'koa-multer';
import mkdirp from 'mkdirp';
import md5    from 'md5';
import path   from 'path';
import del    from 'node-delete';
import gm     from 'gm';

import {
  UPLOADDIRS,
  IMAGESIZES,
  MIMETYPES
} from './consts';

export async function passwordHash(password) {
  const saltRounds = 10;
  const salt       = await bcrypt.genSaltSync(saltRounds);
  return await bcrypt.hashSync(password, salt);
}

export async function passwordCompare(password, hash) {
  return await bcrypt.compareSync(password, hash);
}

export function setError(ctx, error) {
  const errors = Object.keys(error.errors);
  ctx.status = 403;
  ctx.body = {
    message: error.message,
    errors
  };
}

export function setSuccess(ctx, data) {
  ctx.status = 200;
  ctx.body   = data;
}

export function uploader() {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return mkdirp(UPLOADDIRS.original, function (error) {
        if (error) { return; }
        return cb(null, UPLOADDIRS.original);
      });
    },
    filename: (req, file, cb) => {
      const hrTime    = process.hrtime();
      const microtime = hrTime[0] * 1000000 + hrTime[1] / 1000;
      const extname   = path.extname(file.originalname);

      const filename = md5(Date.now() + file.originalname + microtime) + extname;
      return cb(null, filename);
    }
  });

  const multerConfig = {
    storage,
    fileFilter: function (req, file, cb) {
      if (MIMETYPES.includes(file.mimetype)) {
        cb(null, true);
        return;
      }
      cb(null, false);
    }
  };

  return multer(multerConfig);
}

export function imageResizer(filename, srcPath) {
  const sizes = Object.keys(IMAGESIZES);

  let dstPath;

  sizes.forEach((size) => {
    if (size === sizes[0] || size === sizes[1]) { return; }

    mkdirp(UPLOADDIRS[size], function (error) {
      if (error) { return; }

      dstPath = UPLOADDIRS[size] + '/' + filename;
      gm(srcPath)
        .resize(IMAGESIZES[size], IMAGESIZES[size], '^')
        .strip()
        .gravity('Center')
        .crop(IMAGESIZES[size], IMAGESIZES[size])
        .interlace('Line')
        .quality(75)
        .compress('Lossless')
        .write(dstPath, function (error) {
          if (error) { throw error; }
        });
    });
  });
}

export function deleteFiles(files) {
  del.sync(files, { force: true });
}

export function isValidImage(srcPath) {
  return new Promise(function(resolve, reject) {
    gm(srcPath).size(function(error, size) {
      if (error) { throw error; }

      const conditionMin = size.width < IMAGESIZES.needed || size.height < IMAGESIZES.needed;
      const conditionMax = size.width > IMAGESIZES.maximum || size.height > IMAGESIZES.maximum;
      if (conditionMin || conditionMax) {
        deleteFiles([srcPath]);
        reject(false);
      }
      if (!conditionMin && !conditionMax) {
        gm(srcPath)
          .strip()
          .interlace('Line')
          .quality(75)
          .compress('Lossless')
          .write(srcPath, function (error) {
            if (error) {
              reject(false);
              console.error(error);
            }
            resolve(true);
          });
      }
    });
  });
}

export function getImagesUrl(filename) {
  return {
    original:  `${UPLOADDIRS.original}/${filename}`,
    thumbnail: `${UPLOADDIRS.thumbnail}/${filename}`,
    small:     `${UPLOADDIRS.small}/${filename}`,
    medium:    `${UPLOADDIRS.medium}/${filename}`
  };
}
