/// <reference types="node" />
export declare class Klassische {
    private readonly UTF8;
    private _jsonClass;
    private _originalBuffer;
    private _map;
    private _children;
    constructor(contents: Buffer | string);
    parse(): Map<string, string | Klassische>;
}
