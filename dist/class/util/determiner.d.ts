export declare class Determiner {
    /**
     * PRIVATE READONLY CONSTANTS
     * PURE - if the breed of the list is pure, i.e. the list contains homogenous elements
     * MIXED - if the breed of the list if mixed, i.e. the list contains heterogenous elements
     * NULL - if the list is nothing but full of nulls
     */
    private readonly PURE;
    private readonly MIXED;
    private readonly NULL;
    getBreed(list: any[]): string;
}
