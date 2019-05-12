"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Klassische = /** @class */ (function () {
    function Klassische(contents) {
        this.UTF8 = 'utf-8';
        this._originalBuffer = Buffer.isBuffer(contents) ? contents.toString(this.UTF8) : contents;
        try {
            this._jsonClass = JSON.parse(this._originalBuffer);
            this._children = [];
            this._map = new Map();
        }
        catch (exception) {
            throw new Error("ParseException : Non parseable content provided as an argument to the constructor");
        }
    }
    Klassische.prototype.parse = function () {
        // We start with simple objects
        for (var key in this._jsonClass) {
            if (this._jsonClass.hasOwnProperty(key) && this._jsonClass[key] !== null) {
                // Then it is a qualified key
                this._map.set(key, this._jsonClass[key].constructor.name);
            }
        }
        return this._map;
    };
    return Klassische;
}());
exports.Klassische = Klassische;
