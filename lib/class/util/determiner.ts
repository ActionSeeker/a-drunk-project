export class Determiner {

    /**
     * PRIVATE READONLY CONSTANTS
     * PURE - if the breed of the list is pure, i.e. the list contains homogenous elements
     * MIXED - if the breed of the list if mixed, i.e. the list contains heterogenous elements
     * NULL - if the list is nothing but full of nulls
     */
    private readonly PURE: string = 'PURE';
    private readonly MIXED: string = 'MIXED';
    private readonly NULL: string = 'NULL';

    public getBreed(list: any[]): string {
        const types = new Set<string>();
        const alive = list.filter(value => value != null && value != void 0);
        if (alive.length === 0) return this.NULL;
        alive.reduce((prev: any, curr: any) => curr ? types.add(curr.constructor.name) : void 0);
        if (types.size === 1) return this.PURE;
        return this.MIXED;
    }
}