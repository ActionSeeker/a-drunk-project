"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var klassiche_1 = require("../klassiche");
var determiner_1 = require("./determiner");
var Queue = /** @class */ (function () {
    function Queue() {
        this._queue = [];
        this._determiner = new determiner_1.Determiner();
    }
    Queue.prototype.process = function () {
        var _this = this;
        var _loop_1 = function () {
            var enqueued = this_1._queue.shift();
            if (enqueued) {
                // For the sake of the TypeScript
                var parsed_1 = enqueued.getParsedEntity();
                Object.keys(parsed_1).forEach(function (key) {
                    if (parsed_1.hasOwnProperty(key) && _this.isNotNull(parsed_1[key])) {
                        var value = parsed_1[key];
                        if (value.constructor.name === 'Array') {
                            // It is an array of elements
                            // Some logic to extract a class from all the elements of the array
                            var breed = _this._determiner.getBreed([value]);
                            if (breed === 'NULL') { /** Sehr Gut. Kein Problem ! */ }
                            else if (breed === 'PURE') {
                                // For pure, primtive types
                                var pureBreedType = _this._determiner.getBreedType();
                                if (pureBreedType === 'Object' || pureBreedType === 'Array') {
                                    // Which means every element of this is either an object, or an array in itself
                                    var firstChild = value[0];
                                    // We presume the arrays / objects to be identical
                                    _this.registerChild(firstChild, enqueued, key, true);
                                }
                                else {
                                    // Otherwise it is a basic one
                                    enqueued.addToPropMap(key, pureBreedType + "[]");
                                }
                            }
                            else if (breed === 'MIXED') {
                                _this.registerChild(value, enqueued, key, true);
                            }
                        }
                        else if (value.constructor.name === 'Object') {
                            // Another JSON object
                            _this.registerChild(value, enqueued, key);
                        }
                        else {
                            // Then it is a qualified key
                            enqueued.addToPropMap(key, value.constructor.name);
                        }
                    }
                });
            }
        };
        var this_1 = this;
        while (!this.isQueueEmpty()) {
            _loop_1();
        }
    };
    Queue.prototype.registerChild = function (value, enqueued, key, isList) {
        var child = new klassiche_1.Klassische(JSON.stringify(value), enqueued);
        // Push the child as the next element in the queue
        this.push(child);
        // Then, push this child in the parent object
        enqueued.addToPropMap(key, isList ? child.constructor.name + "[]" : child.constructor.name);
    };
    Queue.prototype.push = function (e) {
        this._queue.push(e);
    };
    Queue.prototype.isQueueEmpty = function () {
        return this._queue.length === 0;
    };
    Queue.prototype.isNotNull = function (value) {
        return value !== null;
    };
    return Queue;
}());
exports.Queue = Queue;
