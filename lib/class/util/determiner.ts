export class Determiner {

    /**
     * PUBLIC STATIC READONLY CONSTANTS
     * PURE - if the breed of the list is pure, i.e. the list contains homogenous elements
     * MIXED - if the breed of the list if mixed, i.e. the list contains heterogenous elements
     * NULL - if the list is nothing but full of nulls
     */
    static readonly PURE: string = 'PURE';
    static readonly MIXED: string = 'MIXED';
    static readonly NULL: string = 'NULL';

    private _types!: Set<String>;

    /**
     * Method that returns the kind of elements the array is comprised of
     * @param list List of elements to determine breed of
     */
    public getBreed(list: any[]): string {
        this._types = new Set<string>();
        // Clear all the null / undefined values
        const alive = list.filter(value => value != null && value != void 0);
        if (alive.length === 0) return Determiner.NULL;
        alive.forEach(element => this._types.add(element.constructor.name));
        if (this._types.size === 1) return Determiner.PURE;
        return Determiner.MIXED;
    }

    public getBreedType(): String {
        return Array.from(this._types)[0];
    }
}