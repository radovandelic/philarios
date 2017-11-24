var request = require('request');

module.exports = (query, callback) => {
    query = {
        from: "fr",
        dest: "en",
        format: "json",
        phrase: "bonjour",
        pretty: "false",
        slashes: false
    }
    request.get("https://glosbe.com/gapi/translate", { qs: query }, callback)
}
