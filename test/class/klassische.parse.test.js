const { expect } = require('chai');
const { Klassische } = require('../../dist/class/klassiche');
const { TYPES } = require('../utils/types');

let classic, parsedMap;

describe('Klassiche parsing tests', () => {
    it('Should parse the simple types correct', () => {
        const jsonWithSimpleTypes = {
            "build": "Volkswagen", // string
            "wheels": 4, // integer
            "electric": false, // boolean
            "maxSpeed": Number(134.00), // number
            "details": null
        };
        classic = new Klassische(JSON.stringify(jsonWithSimpleTypes));
        parsedMap = classic.parse();
        expect(parsedMap.size).to.equal(4);
        // Check for elements of the map
        expect(parsedMap.has("build")).to.be.true;
        expect(parsedMap.has("wheels")).to.be.true;
        expect(parsedMap.has("electric")).to.be.true;
        expect(parsedMap.has("maxSpeed")).to.be.true;
        expect(parsedMap.has("details")).to.be.false;
        // Now check for the values
        expect(parsedMap.get("build")).to.equals(TYPES.STRING);
        expect(parsedMap.get("wheels")).to.equals(TYPES.NUMBER);
        expect(parsedMap.get("electric")).to.equals(TYPES.BOOLEAN);
        expect(parsedMap.get("maxSpeed")).to.equals(TYPES.NUMBER);
    });
});