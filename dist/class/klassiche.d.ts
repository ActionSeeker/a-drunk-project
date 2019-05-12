/// <reference types="node" />
export declare class Klassische {
    private readonly UTF8;
    private _jsonClass;
    private _originalBuffer;
    private _map;
    private _parent;
    private _children;
    private _queue;
    constructor(contents: Buffer | string, parent: Klassische | undefined);
    parse(): Klassische;
    readonly jsonClass: any;
    addChild(child: Klassische): void;
    addToPropMap(key: string, value: string): Map<string, string>;
    getAllChildren(): Klassische[];
    getChildAtIndex(idx: number): Klassische;
    getPropMap(): Map<string, string>;
}
