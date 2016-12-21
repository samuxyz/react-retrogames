import {
  watchGetGames,
  watchDeleteGame,
  watchPostGame
} from './games';
import { watchUploadPicture } from './filestack';

export default function* rootSaga () {
  yield [
    watchGetGames(),
    watchDeleteGame(),
    watchPostGame(),
    watchUploadPicture()
  ];
}
