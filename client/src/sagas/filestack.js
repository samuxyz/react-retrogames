import { takeLatest } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import { UPLOAD_PICTURE } from '../constants/filestack';
import {
  uploadPictureSuccess,
  uploadPictureFailure
} from '../actions/filestack';

const pick = () => {
   return new Promise((resolve, reject) => {
    filepicker.pick (
      {
        mimetype: 'image/*',
        container: 'modal',
        services: ['COMPUTER', 'FACEBOOK', 'INSTAGRAM', 'URL', 'IMGUR', 'PICASA'],
        openTo: 'COMPUTER'
      },
      function (Blob) {
        console.log(JSON.stringify(Blob));
        const handler = Blob.url;
        resolve(handler);
      },
      function (FPError) {
        console.log(FPError.toString());
        reject(FPError.toString());
      }
    );
  });
}

function* uploadPicture () {
  try {
    const url = yield call(pick);
    yield put(uploadPictureSuccess(url));
  } catch (error) {
    yield put(uploadPictureFailure());
  }
}

export function* watchUploadPicture () {
  yield takeLatest(UPLOAD_PICTURE, uploadPicture);
}
