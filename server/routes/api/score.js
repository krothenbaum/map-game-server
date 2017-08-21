const Score = require('../../models/score');

module.exports = (app) => {
	app.get('/api/score', (req, res, next) => {
		console.log('In GET Score api');
		Score.find()
			.exec()
			.then((score) => {
				console.log('Random Score: ' + score);
				res.status(201).redirect('https://krothenbaum.github.io/map-game-client/');
			})
			.catch((err) => next(err));
	});

	app.get('/api/score/top', (req, res, next) => {
		Score
			.find()
			.sort({score: -1})
			.limit(10)
			.exec()
			.then((scores) => {
				res.json(scores);
			})
			.catch((err) => next(err));
	});
	
	app.post('/api/score', function (req, res, next) {
		console.log('Request Body is: ' + req.body);
		const score = new Score({name: req.body.name, score: req.body.score});
		score.save()
			.then(newScore => {
				console.log('Score saved: ' + newScore);
				res.status(201).end();
				//temp redirect to local host
				// res.status(201).redirect('https://krothenbaum.github.io/map-game-client/scoreboard');
			})
			.catch(err => {
				console.log(err);
				next(err);
			});
	});
};