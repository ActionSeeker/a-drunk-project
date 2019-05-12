import { Queue } from "./util/queue";

export class Klassische {

    /**
     * PRIVATE UNMUTABLE CONSTANTS
     */
    private readonly UTF8 = 'utf-8';

    /**
     * PRIVATE MEMBERS
     * _jsonClass - Holds the parsed JSON object
     * _originalBuffer - Holds the original string buffer
     * _map - Holds a map of key, value pairs
     * _parent - Holds information about the parent of the given Klassische object
     * _children - List of childrens ( aka first level of nested JSON ) of this Klassishce object
     * _queue - The Queue object as imported from util/queue.ts
     */
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

    /**
     * Method to parse the given JSON object. 
     * This is triggered only for the first object in the row
     * It returns 'this' so that you can have the chaniable API
     */
    public parse(): Klassische {
        this._queue.push(this);
        this._queue.process();
        return this;
    }

    /**
     * Method to return the parsed JSON of 'this' Klassische instance
     */
    public getParsedEntity(): any {
        return this._jsonClass;
    }

    /**
     * Method to add the child to 'this' Klassische instance
     * @param child A Klassische object
     */
    public addChild(child: Klassische): void {
        this._children.push(child);
    }

    /**
     * Method to add the key / value pair to the map of 'this'
     * @param key The key aka the name of the property
     * @param value The value aka the type of the property
     */
    public addToPropMap(key: string, value: string): Map<string, string> {
        return this._map.set(key, value);
    }

    /**
     * Method to get all the children of 'this'
     */
    public getAllChildren(): Klassische[] {
        return this._children;
    }

    /**
     * Method to get child of 'this'
     * @param idx Index to get the child at
     */
    public getChildAtIndex(idx: number): Klassische {
        return this._children[idx];
    }

    /**
     * Method to retrieve the kay / value map of 'this'
     */
    public getPropMap(): Map<string, string> {
        return this._map;
    }
}