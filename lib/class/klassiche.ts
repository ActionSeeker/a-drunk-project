export class Klassische {

    private readonly UTF8 = 'utf-8';

    private _jsonClass: any;
    private _originalBuffer: string;
    private _map: Map<string, string>;
    private _parent: Klassische | undefined;
    private _children: Klassische[];
    private _queue: Klassische[] = [];

    constructor(contents: Buffer | string, parent: Klassische | undefined) {
        this._originalBuffer = Buffer.isBuffer(contents) ? contents.toString(this.UTF8) : contents;
        try {
            this._jsonClass = JSON.parse(this._originalBuffer);
            this._children = [];
            this._map = new Map();
            this._queue.push(this);
            if (parent) this._parent = parent;
        } catch (exception) {
            throw new Error("ParseException : Non parseable content provided as an argument to the constructor");
        }
    }

    parse() {
        while (!this.isQueueEmpty()) {
            let enqued = this._queue.shift();
            if (enqued) {
                let jsonOfEnqd = enqued.jsonClass;
                if (jsonOfEnqd) {
                    for (let key in jsonOfEnqd) {
                        const thisItem = jsonOfEnqd[key];
                        if (jsonOfEnqd.hasOwnProperty(key) && thisItem !== null) {
                            if (thisItem.constructor.name === 'array') {
                                // It is an array of elements
                                // Some logic to extract a class from all the elements of the array
                            } else if (thisItem.constructor.name === 'Object') {
                                // Another JSON object
                                const child = new Klassische(JSON.stringify(thisItem), enqued);
                                enqued.children.push(child);
                                this.queue.push(thisItem);
                                enqued.map.set(key, child.constructor.name);
                            } else {
                                // Then it is a qualified key
                                enqued.map.set(key, thisItem.constructor.name);
                            }
                        }
                    }
                }
            }
        }
        return this._map;
    }

    private isQueueEmpty(): boolean {
        return this._queue.length === 0;
    }

    public get children(): Klassische[] {
        return this._children;
    }

    public get queue(): object[] {
        return this._queue;
    }

    public get map(): Map<string, string> {
        return this._map;
    }

    public get jsonClass(): any {
        return this._jsonClass;
    }
}