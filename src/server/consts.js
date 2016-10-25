import mimes from './helpers/mimes';

export const PUBLIC_DIR = '/home/data/public';

export const UPLOADDIRS = {
  original:  setUploadDir('original'),
  thumbnail: setUploadDir('thumbnail'),
  small:     setUploadDir('small'),
  medium:    setUploadDir('medium')
};

export const IMAGESIZES = {
  needed:    250,
  thumbnail: 75,
  small:     100,
  medium:    200
};

export const MIMETYPES = mimes;

export const ERROR = 'ERROR';
export const OK    = 'OK';

function setUploadDir(size) {
  return `${PUBLIC_DIR}/uploads/${size}`;
}
