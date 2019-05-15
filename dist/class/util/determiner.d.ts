export declare class Determiner {
    /**
     * PUBLIC STATIC READONLY CONSTANTS
     * PURE - if the breed of the list is pure, i.e. the list contains homogenous elements
     * MIXED - if the breed of the list if mixed, i.e. the list contains heterogenous elements
     * NULL - if the list is nothing but full of nulls
     */
    static readonly PURE: string;
    static readonly MIXED: string;
    static readonly NULL: string;
    private _types;
    /**
     * Method that returns the kind of elements the array is comprised of
     * @param list List of elements to determine breed of
     */
    getBreed(list: any[]): string;
    getBreedType(): String;
}
