"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var queue_1 = require("./util/queue");
var Klassische = /** @class */ (function () {
    function Klassische(contents, parent) {
        /**
         * PRIVATE UNMUTABLE CONSTANTS
         */
        this.UTF8 = 'utf-8';
        this._queue = new queue_1.Queue();
        this._originalBuffer = Buffer.isBuffer(contents) ? contents.toString(this.UTF8) : contents;
        try {
            this._jsonClass = JSON.parse(this._originalBuffer);
            this._children = [];
            this._map = new Map();
            if (parent) {
                this._parent = parent;
                parent.addChild(this);
            }
            ;
        }
        catch (exception) {
            throw new Error("ParseException : Non parseable content provided as an argument to the constructor");
        }
    }
    /**
     * Method to parse the given JSON object.
     * This is triggered only for the first object in the row
     * It returns 'this' so that you can have the chaniable API
     */
    Klassische.prototype.parse = function () {
        this._queue.push(this);
        this._queue.process();
        return this;
    };
    /**
     * Method to return the parsed JSON of 'this' Klassische instance
     */
    Klassische.prototype.getParsedEntity = function () {
        return this._jsonClass;
    };
    /**
     * Method to add the child to 'this' Klassische instance
     * @param child A Klassische object
     */
    Klassische.prototype.addChild = function (child) {
        this._children.push(child);
    };
    /**
     * Method to add the key / value pair to the map of 'this'
     * @param key The key aka the name of the property
     * @param value The value aka the type of the property
     */
    Klassische.prototype.addToPropMap = function (key, value) {
        return this._map.set(key, value);
    };
    /**
     * Method to get all the children of 'this'
     */
    Klassische.prototype.getAllChildren = function () {
        return this._children;
    };
    /**
     * Method to get child of 'this'
     * @param idx Index to get the child at
     */
    Klassische.prototype.getChildAtIndex = function (idx) {
        return this._children[idx];
    };
    /**
     * Method to retrieve the kay / value map of 'this'
     */
    Klassische.prototype.getPropMap = function () {
        return this._map;
    };
    Klassische.ANY = 'Any';
    Klassische.OBJECT = 'Object';
    return Klassische;
}());
exports.Klassische = Klassische;
