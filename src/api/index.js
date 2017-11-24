import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import { Client } from 'pg';
//import c from '../controllers';
import { translate } from '../externals';
import { getWords } from '../logic';

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	api.get('/words/:lang/:stage/:level', (req, res) => {
		getWords(req.params, (err, data) => {
			if (err) return res.json(err);
			var words = data.rows;
			res.json(words);
		})
	})

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