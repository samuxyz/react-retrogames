import {
  watchGetGames,
  watchDeleteGame,
  watchPostGame
} from './games';
import { watchUploadPicture } from './filestack';
import { watchLoginUser, watchSignupUser } from './auth';

export default function* rootSaga () {
  yield [
    watchGetGames(),
    watchDeleteGame(),
    watchPostGame(),
    watchUploadPicture(),
    watchLoginUser(),
    watchSignupUser()
  ];
}
