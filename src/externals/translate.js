var request = require('request');

module.exports = (query, word, callback) => {
    query.phrase = word;
    request.get("https://glosbe.com/gapi/translate", { qs: query }, callback)
}
