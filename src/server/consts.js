import mimes from './helpers/mimes';

export const PUBLIC_DIR = '/home/data/public';
export const FILESDIR   = `${PUBLIC_DIR}/uploads/files`;

export const UPLOADDIRS = {
  original:  setImageUploadDir('original'),
  thumbnail: setImageUploadDir('thumbnail'),
  small:     setImageUploadDir('small'),
  medium:    setImageUploadDir('medium')
};

export const IMAGESIZES = {
  needed:    250,
  maximum:   1024,
  thumbnail: 75,
  small:     100,
  medium:    200
};

export const MIMETYPES = mimes;

export const ERROR = 'ERROR';
export const OK    = 'OK';

function setImageUploadDir(size) {
  return `${PUBLIC_DIR}/uploads/avatars/${size}`;
}
