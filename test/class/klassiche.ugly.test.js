const { expect } = require('chai');
const fs = require('fs');
const path = require('path');
const { Klassische } = require('../../dist/class/klassiche');
const { TYPES } = require('../utils/types');

let classic;

const DATA_DIR = path.join(__dirname, path.sep, '..', path.sep, 'data');
const UGLY_JSON_FILEPATH = path.join(DATA_DIR, path.sep, 'ugly.json');

describe('A basic, mixed JSON parsing', () => {
    it('Should correctly parse the ugly_types.json sans errors', () => {
        fs.readFile(UGLY_JSON_FILEPATH, (error, data) => {
            classic = new Klassische(data).parse();

            // First level assertion
            expect(classic.getPropMap().size).to.equal(1);
            expect(classic.getPropMap().get('descriptions')).to.equals(`${TYPES.ANY}[]`);
            expect(classic.getAllChildren().length).to.equals(0);
        });
    });
});