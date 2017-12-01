var translator = require('google-translator');

module.exports = (from, to, word, callback) => {
    translator(from, to, word, callback);
}