import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import { Pool } from 'pg';
//import c from '../controllers';
import { translate } from '../externals';

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	api.get('/:userid/:level', (req, res) => {
		translate({}, (err, data) => {
			res.json(err || JSON.parse(data.body));
		})
	})

	return api;
}
