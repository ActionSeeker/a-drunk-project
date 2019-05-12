export class Klassische {

    private readonly UTF8 = 'utf-8';

    private _jsonClass: any;
    private _originalBuffer: string;

    constructor(contents: Buffer | string) {
        this._originalBuffer = Buffer.isBuffer(contents) ? contents.toString(this.UTF8) : contents;
        try {
            this._jsonClass = JSON.parse(this._originalBuffer);
        } catch (exception) {
            throw new Error("ParseException : Non parseable content provided as an argument to the constructor");
        }
    }
}