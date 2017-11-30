var fs = require('file-system');
var countries = require('country-data').countries;
var languages = require('country-data').languages;

var flags = {};

//find countries for each language from countries and languages datasets 
for (var code in countries) {
    if (countries[code].languages) {
        for (var l in countries[code].languages) {
            var lang = languages[countries[code].languages[l]].alpha2;
            if (!flags[lang]) {
                flags[lang] = [];
            }
            var country = countries[code].alpha2
            if (flags[lang][0] != country) {
                flags[lang].push(country);
            }
        }
    }
}

//select most appropriate country for langauge
for (lang in flags) {
    switch (lang) {
        case "en":
            flags[lang] = "UK";
            break;
        case "de":
            flags[lang] = "DE";
            break;
        case 'fr':
            flags[lang] = "FR";
            break;
        case 'nl':
            flags[lang] = "NL";
            break;
        case 'sv':
            flags[lang] = "SE";
            break;
        case 'es':
            flags[lang] = "ES";
            break;
        case 'pt':
            flags[lang] = "PT";
            break;
        case 'ar':
            flags[lang] = "EG";
            break;
        case 'it':
            flags[lang] = "IT";
            break;
        case 'sr':
            flags[lang] = "RS";
            break;
        case 'ru':
            flags[lang] = "RU";
            break;
        case 'ro':
            flags[lang] = "RO";
            break;
        case 'sw':
            flags[lang] = "UG";
            break;
        case 'ga':
            flags[lang] = "IE";
            break;
        case "":
            delete flags[lang];
            break;
        default:
            flags[lang] = flags[lang][0];
            break;
    }
}
flags["ca"] = "CT";

//save as javascript object
var flagString = "module.exports = " + JSON.stringify(flags) + ";"
fs.writeFile('flagCodes.js', flagString, (err) => {
    console.log(err || "done");
});