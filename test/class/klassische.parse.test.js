const { expect } = require('chai');
const { Klassische } = require('../../dist/class/klassiche');
const { TYPES } = require('../utils/types');

let classic;

describe('Klassiche parsing tests', () => {
    it('Should parse the simple types correct', () => {
        const jsonWithSimpleTypes = {
            "build": "Volkswagen", // string
            "wheels": 4, // integer
            "electric": false, // boolean
            "maxSpeed": 134.00, // number
            "details": null
        };
        classic = new Klassische(JSON.stringify(jsonWithSimpleTypes)).parse();
        const propMap = classic.getPropMap();
        // Check for the size
        expect(propMap.size).to.equal(4);
        // Check for elements of the map
        expect(propMap.has("build")).to.be.true;
        expect(propMap.has("wheels")).to.be.true;
        expect(propMap.has("electric")).to.be.true;
        expect(propMap.has("maxSpeed")).to.be.true;
        expect(propMap.has("details")).to.be.false;
        // Now check for the values
        expect(propMap.get("build")).to.equals(TYPES.STRING);
        expect(propMap.get("wheels")).to.equals(TYPES.NUMBER);
        expect(propMap.get("electric")).to.equals(TYPES.BOOLEAN);
        expect(propMap.get("maxSpeed")).to.equals(TYPES.NUMBER);
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

        classic = new Klassische(JSON.stringify(jsonWithSimpleTypes)).parse();
        const propMap = classic.getPropMap();
        // Assert for size
        expect(propMap.size).to.equal(3);
        // Basic value assertion
        expect(propMap.get("build")).to.equals(TYPES.STRING);
        expect(propMap.get("wheels")).to.equals(TYPES.NUMBER);
        expect(propMap.get("details")).to.equals(TYPES.CLASSIC);
        // Assert for children count
        expect(classic.getAllChildren().length).to.equals(1);

        const firstChild = classic.getChildAtIndex(0);
        const firstChildPropMap = firstChild.getPropMap();

        expect(firstChildPropMap.size).to.equals(3);
        expect(firstChildPropMap.get('manufacturer')).to.equals(TYPES.STRING);
        expect(firstChildPropMap.get('distance')).to.equals(TYPES.NUMBER);
        expect(firstChildPropMap.get('unit')).to.equals(TYPES.STRING);
    });
});