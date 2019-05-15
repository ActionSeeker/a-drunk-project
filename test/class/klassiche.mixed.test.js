const { expect } = require('chai');
const fs = require('fs');
const path = require('path');
const { Klassische } = require('../../dist/class/klassiche');
const { TYPES } = require('../utils/types');

let classic;

const DATA_DIR = path.join(__dirname, path.sep, '..', path.sep, 'data');
const MIXED_JSON_FILEPATH = path.join(DATA_DIR, path.sep, 'mixed_types.json');

describe('A basic, mixed JSON parsing', () => {
    it('Should correctly parse the mixed_types.json sans errors', () => {
        fs.readFile(MIXED_JSON_FILEPATH, (error, data) => {
            classic = new Klassische(data).parse();

            // First level assertion
            expect(classic.getPropMap().size).to.equal(1);
            expect(classic.getPropMap().get('items')).to.equals(TYPES.CLASSIC);
            expect(classic.getAllChildren().length).to.equals(1);

            const firstChild = classic.getChildAtIndex(0);
            // Second level assertion
            expect(firstChild.getPropMap().size).to.equal(1);
            expect(firstChild.getPropMap().get('item')).to.equals(`${TYPES.CLASSIC}[]`);
            expect(firstChild.getAllChildren().length).to.equals(1);

            // Third level assertion
            const grandChild = firstChild.getChildAtIndex(0);
            expect(grandChild.getAllChildren().length).to.equals(2);
            expect(grandChild.getPropMap().size).to.equals(6);

            // Fourth level assertion
            expect(grandChild.getChildAtIndex(0).getAllChildren().length).to.equals(1);
            expect(grandChild.getChildAtIndex(0).getPropMap().size).to.equals(1);
            expect(grandChild.getChildAtIndex(1).getAllChildren().length).to.equals(0);
            expect(grandChild.getChildAtIndex(1).getPropMap().size).to.equals(2);
            expect(grandChild.getChildAtIndex(1).getPropMap().get('id')).to.equals(TYPES.STRING);
            expect(grandChild.getChildAtIndex(1).getPropMap().get('type')).to.equals(TYPES.STRING);
        });
    });
});