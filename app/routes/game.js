import Game from '../models/game';

const getGames = (req, res) => {
	Game.find(null, null, { sort: { postDate : 1 } }, (err, games) => {
		if (err) {
			res.send(err);
		}
		res.json(games);
	});
}

const getGame = (req, res) => {
	const { id } = req.params;
	Game.findById(id, (err, game) => {
		if (err) {
			res.send(err);
		}
		res.json(game);
	});
}

const postGame = (req, res) => {
  let game = Object.assign(new Game(), req.body);
  game.save(err => {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'Game successfully created!' });
  });
};

const deleteGame = (req, res) => {
  Game.remove(
    { _id: req.params.id },
    err => {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Game successfully deleted!' });
    }
  );
};

export {
	getGames,
	getGame,
  postGame,
  deleteGame
};
