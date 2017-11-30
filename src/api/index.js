import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
//import c from '../controllers';
import { translate } from '../externals';
import { getWords } from '../logic';

import { Client } from 'pg';
const db = {
	user: process.env.DBUSERNAME,
	host: 'localhost',
	database: process.env.DBNAME,
	password: process.env.DBPASSWORD,
	port: 5432,
};
var client = new Client(db);

export default ({ config, db }) => {
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
				dest: req.params.dest,
				format: "json",
				pretty: "false"
			}
			var t = (i) => {
				if (i < words.length) {
					translate(query, words[i].word, (err, data) => {
						if (err) words[i].err = err;
						else words[i].translations = JSON.parse(data.body).tuc;
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
	api.get('/translate/:from/:dest/:word', (req, res) => {

		var query = {
			from: req.params.from,
			dest: req.params.dest,
			format: "json",
			pretty: false
		}
		translate(query, req.params.word, (err, data) => {
			var translations = []
			if (!err) {
				var translationsObject = JSON.parse(data.body).tuc;
				for (var i in translationsObject) {
					if (translationsObject[i].phrase) translations.push(translationsObject[i].phrase.text);
				}
			}
			res.json(err || translations);
		})
	})

	//test translation api
	api.get('/translate/test', (req, res) => {

		var query = {
			from: "fr",
			dest: "en",
			format: "json",
			pretty: false
		}
		translate(query, "bonjour", (err, data) => {
			res.json(err || JSON.parse(data.body));
		})
	})

	return api;
}