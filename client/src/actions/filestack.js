import {
  UPLOAD_PICTURE,
  UPLOAD_PICTURE_SUCCESS,
  UPLOAD_PICTURE_FAILURE
} from '../constants/filestack';

function uploadPicture () {
  return {
    type: UPLOAD_PICTURE
  };
}

function uploadPictureSuccess (url) {
  return {
    type: UPLOAD_PICTURE_SUCCESS,
    url
  };
}

function uploadPictureFailure () {
  return {
    type: UPLOAD_PICTURE_FAILURE
  };
}

export {
  uploadPicture,
  uploadPictureSuccess,
  uploadPictureFailure
};
