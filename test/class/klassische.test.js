const { expect } = require('chai');
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const { Klassische } = require('../../dist/class/klassiche');

let classy;

const DATA_DIR = path.join(__dirname, path.sep, 'data');
const VALID_JSON_FILEPATH = path.join(DATA_DIR, path.sep, 'valid_json_file.json');
const INVALID_JSON_FILEPATH = path.join(DATA_DIR, path.sep, 'invalid_json_file.json');

let fsGenerated = false;

describe('Klassiche parsing tests', () => {
    before((done) => {
        if (!fs.existsSync(DATA_DIR)) {
            fsGenerated = true;
            fs.mkdirSync(DATA_DIR);
            // Create two test files
            fs.writeFileSync(VALID_JSON_FILEPATH, JSON.stringify({ "testData": "Hallo" }), 'utf-8');
            fs.writeFileSync(INVALID_JSON_FILEPATH, "Lorum Ipsum not parseable");
        }
        done();
    });

    it('Should parse a valid JSON Buffer from file correctly', () => {
        classy = new Klassische(fs.readFileSync(VALID_JSON_FILEPATH));
    });

    it('Should throw exception for an invalid JSON Buffer', () => {
        try {
            classy = new Klassische(fs.readFileSync(VALID_JSON_FILEPATH));
        } catch (ex) {
            expect(ex.message).to.equal("ParseException : Non parseable content provided as an argument to the constructor");
        }
    });

    it('Should parse a valid JSON String from file correctly', () => {
        classy = new Klassische(JSON.stringify({ "message": "Hello World" }));
    });

    it('Should throw exception for an invalid JSON String', () => {
        try {
            classy = new Klassische("JSON String");
        } catch (ex) {
            expect(ex.message).to.equal("ParseException : Non parseable content provided as an argument to the constructor");
        }
    });

    after((done) => {
        // Cleanup
        if (fsGenerated) rimraf.sync(DATA_DIR);
        done();
    })
});