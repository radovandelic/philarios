import { version } from '../../package.json';
import { Router } from 'express';
//import c from '../controllers';
import { translate, imageSearch } from '../externals';
import { getWords } from '../logic';

export default ({ config }) => {
	let api = Router();

	//test route
	api.get('/', (req, res) => {
		res.json({ version });
	});

	//get wordlist route
	api.get('/words/:lang/:stage/:level', (req, res) => {
		getWords(req.params, (err, data) => {
			if (err) return res.status(500).json(err);
			var words = data.rows;
			res.status(200).json(words);
		})
	})

	api.post('/progress/', (req, res) => {
		//work in progress

		/*var attempts = req.body.attempts;
		var userid = req.body.userid;
		var sql = `SELECT * FROM progress WHERE userid = '${userid}' AND (`;
		for (var i in attempts) {
			sql += (i != 0) ? "OR " : "";
			sql += `word = '${attempts[i].word}' `;
		}
		sql += ");"
		client.connect();
		client.query(sql, (err, data) => {
			for (var i in data.rows) {
				return;
			}
		})*/
	})

	api.get('/smartpractice/:userid', (req, res) => {
		//work in progress

		/*var attempts = req.body.attempts;
		var userid = req.body.userid;
		var sql = `SELECT * FROM progress WHERE userid = '${userid}' AND (`;
		for (var i in attempts) {
			sql += (i != 0) ? "OR " : "";
			sql += `word = '${attempts[i].word}' `;
		}
		sql += ");"
		client.connect();
		client.query(sql, (err, data) => {

		})*/
	})

	//get full wordlist with translations
	api.get('/wordsfull/:lang/:dest/:stage/:level', (req, res) => {
		getWords(req.params, (err, data) => {
			if (err) return res.json(err);
			var words = data.rows;
			var query = {
				from: req.params.lang,
				to: req.params.dest,
				format: "json",
				pretty: "false"
			}
			var t = (i) => {
				if (i < words.length) {
					translate(query.from, query.to, words[i].word, (data, err) => {
						if (err) words[i].err = err;
						else {
							words[i].translations = [];
							for (let word of data.translations) {
								for (let translation of word.translations) {
									words[i].translations.push(translation[0])
								}
							}

						}
						i++;
						t(i);
					})
				} else {
					res.json(words);
				}
			}
			t(0); //recursion in order to avoid overloading
		})
	})

	//translation route
	api.get('/translate/:from/:to/:word', (req, res) => {

		switch (req.params.to) {
			case 'zh':
				req.params.to = 'zh-TW';
				break;
			case 'bs':
				req.params.to = 'hr';
				break;
			default:
				break;
		}
		translate(req.params.from, req.params.to, req.params.word, (data, err) => {
			var translations = []
			if (!err) {
				translations = data.target.synonyms //clean data
					.map(word => { return word.replace("!", "").replace(".", "").replace("?", ""); })
			}
			res.json(err || translations);
		})
	})

	//test translation api
	api.get('/translate/test', (req, res) => {

		var from = "fr";
		var to = "en";
		translate(from, to, "bonjour", (data, err) => {
			res.json(err || data.target.synonyms);
		})
	})

	//image search api
	api.get('/images/:word', (req, res) => {
		imageSearch(req.params.word, config, (err, result) => {
			if (err) { throw new Error(err); }
			res.json(result.photos.photo[0].url_m)
		})
	})

	return api;
}