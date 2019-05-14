"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Determiner = /** @class */ (function () {
    function Determiner() {
        /**
         * PRIVATE READONLY CONSTANTS
         * PURE - if the breed of the list is pure, i.e. the list contains homogenous elements
         * MIXED - if the breed of the list if mixed, i.e. the list contains heterogenous elements
         * NULL - if the list is nothing but full of nulls
         */
        this.PURE = 'PURE';
        this.MIXED = 'MIXED';
        this.NULL = 'NULL';
    }
    Determiner.prototype.getBreed = function (list) {
        var types = new Set();
        var alive = list.filter(function (value) { return value != null && value != void 0; });
        if (alive.length === 0)
            return this.NULL;
        alive.reduce(function (prev, curr) { return curr ? types.add(curr.constructor.name) : void 0; });
        if (types.size === 1)
            return this.PURE;
        return this.MIXED;
    };
    return Determiner;
}());
exports.Determiner = Determiner;
