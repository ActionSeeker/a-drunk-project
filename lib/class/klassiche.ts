import { Queue } from "./util/queue";

export class Klassische {

    private readonly UTF8 = 'utf-8';

    private _jsonClass: any;
    private _originalBuffer: string;
    private _map: Map<string, string>;
    private _parent: Klassische | undefined;
    private _children: Klassische[];
    private _queue: Queue = new Queue();

    constructor(contents: Buffer | string, parent: Klassische | undefined) {
        this._originalBuffer = Buffer.isBuffer(contents) ? contents.toString(this.UTF8) : contents;
        try {
            this._jsonClass = JSON.parse(this._originalBuffer);
            this._children = [];
            this._map = new Map();
            if (parent) { this._parent = parent; parent.addChild(this) };
        } catch (exception) {
            throw new Error("ParseException : Non parseable content provided as an argument to the constructor");
        }
    }

    public parse(): Klassische {
        this._queue.push(this);
        this._queue.process();
        return this;
    }

    public get jsonClass(): any {
        return this._jsonClass;
    }

    public addChild(child: Klassische): void {
        this._children.push(child);
    }

    public addToPropMap(key: string, value: string): Map<string, string> {
        return this._map.set(key, value);
    }

    public getAllChildren(): Klassische[] {
        return this._children;
    }

    public getChildAtIndex(idx: number): Klassische {
        return this._children[idx];
    }

    public getPropMap(): Map<string, string> {
        return this._map;
    }
}