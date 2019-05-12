"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Klassische = /** @class */ (function () {
    function Klassische(contents, parent) {
        this.UTF8 = 'utf-8';
        this._queue = [];
        this._originalBuffer = Buffer.isBuffer(contents) ? contents.toString(this.UTF8) : contents;
        try {
            this._jsonClass = JSON.parse(this._originalBuffer);
            this._children = [];
            this._map = new Map();
            this._queue.push(this);
            if (parent)
                this._parent = parent;
        }
        catch (exception) {
            throw new Error("ParseException : Non parseable content provided as an argument to the constructor");
        }
    }
    Klassische.prototype.parse = function () {
        while (!this.isQueueEmpty()) {
            var enqued = this._queue.shift();
            if (enqued) {
                var jsonOfEnqd = enqued.jsonClass;
                if (jsonOfEnqd) {
                    for (var key in jsonOfEnqd) {
                        var thisItem = jsonOfEnqd[key];
                        if (jsonOfEnqd.hasOwnProperty(key) && thisItem !== null) {
                            if (thisItem.constructor.name === 'array') {
                                // It is an array of elements
                                // Some logic to extract a class from all the elements of the array
                            }
                            else if (thisItem.constructor.name === 'Object') {
                                // Another JSON object
                                var child = new Klassische(JSON.stringify(thisItem), enqued);
                                enqued.children.push(child);
                                this.queue.push(thisItem);
                                enqued.map.set(key, child.constructor.name);
                            }
                            else {
                                // Then it is a qualified key
                                enqued.map.set(key, thisItem.constructor.name);
                            }
                        }
                    }
                }
            }
        }
        return this._map;
    };
    Klassische.prototype.isQueueEmpty = function () {
        return this._queue.length === 0;
    };
    Object.defineProperty(Klassische.prototype, "children", {
        get: function () {
            return this._children;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Klassische.prototype, "queue", {
        get: function () {
            return this._queue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Klassische.prototype, "map", {
        get: function () {
            return this._map;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Klassische.prototype, "jsonClass", {
        get: function () {
            return this._jsonClass;
        },
        enumerable: true,
        configurable: true
    });
    return Klassische;
}());
exports.Klassische = Klassische;
