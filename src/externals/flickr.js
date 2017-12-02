var Flickr = require('flickrapi');
var config = require('../config')
module.exports = (text, config, callback) => {
    var flickrOptions = {
        api_key: config.flickr_key,
        secret: config.flickr_secret
    };

    Flickr.tokenOnly(flickrOptions, (error, flickr) => {
        flickr.photos.search({
            text: text,
            page: 1,
            per_page: 1,
            sort: "relevance",
            extras: "url_m"
        },
            callback);
    });
}