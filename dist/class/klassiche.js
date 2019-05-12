"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var queue_1 = require("./util/queue");
var Klassische = /** @class */ (function () {
    function Klassische(contents, parent) {
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
    Klassische.prototype.parse = function () {
        this._queue.push(this);
        this._queue.process();
        return this;
    };
    Object.defineProperty(Klassische.prototype, "jsonClass", {
        get: function () {
            return this._jsonClass;
        },
        enumerable: true,
        configurable: true
    });
    Klassische.prototype.addChild = function (child) {
        this._children.push(child);
    };
    Klassische.prototype.addToPropMap = function (key, value) {
        return this._map.set(key, value);
    };
    Klassische.prototype.getAllChildren = function () {
        return this._children;
    };
    Klassische.prototype.getChildAtIndex = function (idx) {
        return this._children[idx];
    };
    Klassische.prototype.getPropMap = function () {
        return this._map;
    };
    return Klassische;
}());
exports.Klassische = Klassische;
