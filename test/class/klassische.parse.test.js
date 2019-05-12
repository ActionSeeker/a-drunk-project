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

    it('Should parse the one level nested JSON correct', () => {
        const jsonWithSimpleTypes = {
            "build": "Volkswagen", // string
            "wheels": 4, // integer
            "details": {
                "manufacturer": "VW Milton Keynes", // String
                "distance": 0.8,
                "unit": "miles",
                // "address": {
                //     "bldgName": "GreyFriars Court",
                //     "subArea": "Kingston",
                //     "city": "Milton Keynes",
                //     "county": "Bukcinghamshire",
                //     "postCode": "MK10 0BN"
                // }
            }
        };
        classic = new Klassische(JSON.stringify(jsonWithSimpleTypes));
        parsedMap = classic.parse();
        expect(parsedMap.size).to.equal(3);
        // Check for the basic values
        expect(parsedMap.get("build")).to.equals(TYPES.STRING);
        expect(parsedMap.get("wheels")).to.equals(TYPES.NUMBER);
        expect(parsedMap.get("details")).to.equals(TYPES.CLASSIC);
        // Check for the children
        expect(classic.children.length).to.equals(1);
        console.log(classic.children[0])
        const mapOfFistChild = classic.children[0].map;
        expect(mapOfFistChild.size).to.equals(3);
        expect(mapOfFistChild.get('manufacturer')).to.equals(TYPES.STRING);
        expect(mapOfFistChild.get('distance')).to.equals(TYPES.NUMBER);
        expect(mapOfFistChild.get('unit')).to.equals(TYPES.STRING);
    });
});