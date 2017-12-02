
import c from './config.json';
import d from './db.js';

c.flickr_key = process.env.FLICKR_KEY;
c.flickr_secret = process.env.FLIRCKR_SECRET;
export const config = c;
export const db = d;