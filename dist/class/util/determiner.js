"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Determiner = /** @class */ (function () {
    function Determiner() {
    }
    Determiner.prototype.getBreed = function (list) {
        var _this = this;
        this._types = new Set();
        var alive = list.filter(function (value) { return value != null && value != void 0; });
        if (alive.length === 0)
            return Determiner.NULL;
        alive.reduce(function (prev, curr) { return curr ? _this._types.add(curr.constructor.name) : void 0; });
        if (this._types.size === 1)
            return Determiner.PURE;
        return Determiner.MIXED;
    };
    Determiner.prototype.getBreedType = function () {
        return Array.from(this._types)[0];
    };
    /**
     * PUBLIC STATIC READONLY CONSTANTS
     * PURE - if the breed of the list is pure, i.e. the list contains homogenous elements
     * MIXED - if the breed of the list if mixed, i.e. the list contains heterogenous elements
     * NULL - if the list is nothing but full of nulls
     */
    Determiner.PURE = 'PURE';
    Determiner.MIXED = 'MIXED';
    Determiner.NULL = 'NULL';
    return Determiner;
}());
exports.Determiner = Determiner;
