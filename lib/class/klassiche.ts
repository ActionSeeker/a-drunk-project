export class Klassische {

    private readonly UTF8 = 'utf-8';

    private _jsonClass: any;
    private _originalBuffer: string;
    private _map: Map<string, string | Klassische>;
    private _children: Klassische[];

    constructor(contents: Buffer | string) {
        this._originalBuffer = Buffer.isBuffer(contents) ? contents.toString(this.UTF8) : contents;
        try {
            this._jsonClass = JSON.parse(this._originalBuffer);
            this._children = [];
            this._map = new Map();
        } catch (exception) {
            throw new Error("ParseException : Non parseable content provided as an argument to the constructor");
        }
    }

    parse() {
        // We start with simple objects
        for (let key in this._jsonClass) {
            if (this._jsonClass.hasOwnProperty(key) && this._jsonClass[key] !== null) {
                // Then it is a qualified key
                this._map.set(key, this._jsonClass[key].constructor.name);
            }
        }
        return this._map;
    }
}