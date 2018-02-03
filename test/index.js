var expect = require("chai").expect;
var request = require("request");

var hostname = process.env.HOST ? process.env.HOST : 'http://localhost:1337';

describe("API", () => {
    describe("Wordlist API", () => {
        it("should return an array with 10 word objects", (done) => {
            request(`${hostname}/api/words/en/0/0`, (err, res, body) => {
                let words = JSON.parse(body);
                expect(words).to.be.an('array');
                expect(words[0]).to.include.keys('word', 'id');
                expect(words.length).to.equal(10);
                done();
            });
        });
    });

    describe("Translate API", () => {
        it("should return an array with all known translations", (done) => {
            request(`${hostname}/api/translate/en/de/hello`, (err, res, body) => {
                let translations = JSON.parse(body);
                expect(translations).to.be.an('array');
                expect(translations[0]).to.be.a('string');
                done();
            });
        });
    });

    describe("Images API", () => {
        it("should return a url to an image of the requested word hosted on flickr", (done) => {
            request(`${hostname}/api/images/cat`, (err, res, body) => {
                let url = JSON.parse(body);
                expect(url).to.be.a('string');
                expect(url).to.include('https://');
                expect(url).to.include('flickr');
                done();
            });
        });
    });

    describe("Full Wordlist API", () => {
        it("should return an array with 10 word objects including translations", (done) => {
            request(`${hostname}/api/wordsfull/en/de/0/0`, (err, res, body) => {
                let words = JSON.parse(body);
                expect(words).to.be.an('array');
                expect(words[0]).to.include.keys('word', 'id', 'translations');
                expect(words.length).to.equal(10);
                done();
            });
        });
    });
});