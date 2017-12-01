var fs = require('file-system');
var { Client } = require('pg');
var lang = require('./lang');

const db = {
    user: process.env.DBUSERNAME,
    host: 'localhost',
    database: process.env.DBNAME,
    password: process.env.DBPASSWORD,
    port: 5432,
};
var client = new Client(db);

var queries = [];
fs.recurseSync('wordFrequencyLists', '**/*.txt', (filename, relative) => {
    var lang_code = relative.split("/")[0];
    if (lang[lang_code]) {
        //var sql = `DROP TABLE ${lang_code} ;`;
        var sql = `CREATE TABLE ${lang_code} `;
        sql += "(\nid bigserial PRIMARY KEY, ";
        sql += "word varchar(50) NOT NULL, ";
        sql += "frequency int, ";
        sql += "type varchar(10), ";
        sql += "definition varchar(1000) ";
        sql += "\n);\n";
        var data = fs.readFileSync(filename, 'utf8');
        var words = data.split("\n");
        for
         (var i in words) {
            sql += words[i] ? `INSERT INTO ${lang_code}(word, frequency) VALUES('${words[i].replace(" ", "', ")});\n` : "";
        }
        queries.push(sql);
    }
})


var i = 0;
client.connect();
var query = () => {
    client.query(queries[i], (err, response) => {
        i++;
        if (i < queries.length) query();
        else client.end();
    })
}
query();