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
    parse(): Map<string, string>;
    private isQueueEmpty;
    readonly children: Klassische[];
    readonly queue: object[];
    readonly map: Map<string, string>;
    readonly jsonClass: any;
}
