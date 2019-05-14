/// <reference types="node" />
export declare class Klassische {
    /**
     * PRIVATE UNMUTABLE CONSTANTS
     */
    private readonly UTF8;
    /**
     * PRIVATE MEMBERS
     * _jsonClass - Holds the parsed JSON object
     * _originalBuffer - Holds the original string buffer
     * _map - Holds a map of key, value pairs
     * _parent - Holds information about the parent of the given Klassische object
     * _children - List of childrens ( aka first level of nested JSON ) of this Klassishce object
     * _queue - The Queue object as imported from util/queue.ts
     */
    private _jsonClass;
    private _originalBuffer;
    private _map;
    private _parent;
    private _children;
    private _queue;
    constructor(contents: Buffer | string, parent: Klassische | undefined);
    /**
     * Method to parse the given JSON object.
     * This is triggered only for the first object in the row
     * It returns 'this' so that you can have the chaniable API
     */
    parse(): Klassische;
    /**
     * Method to return the parsed JSON of 'this' Klassische instance
     */
    getParsedEntity(): any;
    /**
     * Method to add the child to 'this' Klassische instance
     * @param child A Klassische object
     */
    addChild(child: Klassische): void;
    /**
     * Method to add the key / value pair to the map of 'this'
     * @param key The key aka the name of the property
     * @param value The value aka the type of the property
     */
    addToPropMap(key: string, value: string): Map<string, string>;
    /**
     * Method to get all the children of 'this'
     */
    getAllChildren(): Klassische[];
    /**
     * Method to get child of 'this'
     * @param idx Index to get the child at
     */
    getChildAtIndex(idx: number): Klassische;
    /**
     * Method to retrieve the kay / value map of 'this'
     */
    getPropMap(): Map<string, string>;
}
