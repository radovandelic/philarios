var fs = require('file-system');
var { Client } = require('pg');
var lang = require('./lang');

const db = {
    user: process.env.DBPASSWORD,
    host: 'localhost',
    database: process.env.DBPASSWORD,
    password: process.env.DBPASSWORD,
    port: 5432,
};
var client = new Client(db);

var queries = [];
fs.recurseSync('2016', '**/*.txt', (filename, relative) => {
    var lang_code = relative.split("/")[0];
    if (lang[lang_code]) {
        var language = lang[lang_code]['name'];
        var sql = `CREATE TABLE ${language} `;
        sql += "(\nword varchar(50), ";
        sql += "frequency int, ";
        sql += "type varchar(10), ";
        sql += "definition varchar(1000)\n);\n";
        var data = fs.readFileSync(filename, 'utf8');
        var words = data.split("\n");
        for (var i in words) {
            sql += words[i] ? `INSERT INTO ${language} VALUES('${words[i].replace(" ", "', ")});\n` : "";
        }
        queries.push(sql);
    }
})

var i = 0;
client.connect();
var query = () => {
    client.query(queries[i], (err, response) => {
        i++;
        console.log(err || response);
        if (i < queries.length) query();
        else client.end();
    })
}
query();