"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Klassische = /** @class */ (function () {
    function Klassische(contents) {
        this.UTF8 = 'utf-8';
        this._originalBuffer = Buffer.isBuffer(contents) ? contents.toString(this.UTF8) : contents;
        try {
            this._jsonClass = JSON.parse(this._originalBuffer);
        }
        catch (exception) {
            throw new Error("ParseException : Non parseable content provided as an argument to the constructor");
        }
    }
    return Klassische;
}());
exports.Klassische = Klassische;
