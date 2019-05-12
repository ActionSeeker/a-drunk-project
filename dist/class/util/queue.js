"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var klassiche_1 = require("../klassiche");
var Queue = /** @class */ (function () {
    function Queue() {
        this._queue = [];
    }
    Queue.prototype.process = function () {
        var _this = this;
        var _loop_1 = function () {
            var enqueued = this_1._queue.shift();
            if (enqueued) {
                // For the sake of the TypeScript
                var parsed_1 = enqueued.jsonClass;
                Object.keys(parsed_1).forEach(function (key) {
                    if (parsed_1.hasOwnProperty(key) && _this.isNotNull(parsed_1[key])) {
                        var value = parsed_1[key];
                        if (value.constructor.name === 'array') {
                            // It is an array of elements
                            // Some logic to extract a class from all the elements of the array
                        }
                        else if (value.constructor.name === 'Object') {
                            // Another JSON object
                            var child = new klassiche_1.Klassische(JSON.stringify(value), enqueued);
                            // Push the child as the next element in the queue
                            _this.push(child);
                            // Then, push this child in the parent object
                            enqueued.addToPropMap(key, child.constructor.name);
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
