import { Client } from 'pg';

const db = {
    user: process.env.DBUSERNAME,
    host: 'localhost',
    database: process.env.DBNAME,
    password: process.env.DBPASSWORD,
    port: 5432,
};

const getWords = (query/*{language, stage, level}*/, callback) => {
    var offset = query.stage * 100 + query.level * 10;
    if (!isNaN(offset)) {
        var client = new Client(db);
        client.connect();
        client.query(`SELECT * FROM ${query.lang} OFFSET ${offset} LIMIT 10;`, callback);
    }
}

module.exports = { getWords };