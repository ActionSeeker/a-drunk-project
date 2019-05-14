import { Klassische } from "../klassiche";
import { Determiner } from "./determiner";

export class Queue {

    private _queue: Klassische[] = [];
    private _determiner = new Determiner();

    public process(): void {
        while (!this.isQueueEmpty()) {
            const enqueued: Klassische | undefined = this._queue.shift();
            if (enqueued) {
                // For the sake of the TypeScript
                let parsed: any = enqueued.getParsedEntity();
                Object.keys(parsed).forEach((key: string) => {
                    if (parsed.hasOwnProperty(key) && this.isNotNull(parsed[key])) {
                        const value = parsed[key];
                        if (value.constructor.name === 'Array') {
                            // It is an array of elements
                            // Some logic to extract a class from all the elements of the array
                            const breed = this._determiner.getBreed([value]);
                            if (breed === 'NULL') {/** Sehr Gut. Kein Problem ! */ }
                            else if (breed === 'PURE') {
                                // For pure, primtive types
                                const pureBreedType = this._determiner.getBreedType();
                                if (pureBreedType === 'Object' || pureBreedType === 'Array') {
                                    // Which means every element of this is either an object, or an array in itself
                                    const firstChild = value[0];
                                    // We presume the arrays / objects to be identical
                                    this.registerChild(firstChild, enqueued, key, true);
                                } else {
                                    // Otherwise it is a basic one
                                    enqueued.addToPropMap(key, `${pureBreedType}[]`);
                                }
                            } else if (breed === 'MIXED') {
                                this.registerChild(value, enqueued, key, true);
                            }
                        } else if (value.constructor.name === 'Object') {
                            // Another JSON object
                            this.registerChild(value, enqueued, key);
                        } else {
                            // Then it is a qualified key
                            enqueued.addToPropMap(key, value.constructor.name);
                        }
                    }
                });
            }
        }
    }

    private registerChild(value: any, enqueued: Klassische, key: string, isList?: boolean) {
        const child = new Klassische(JSON.stringify(value), enqueued);
        // Push the child as the next element in the queue
        this.push(child);
        // Then, push this child in the parent object
        enqueued.addToPropMap(key, isList ? `${child.constructor.name}[]` : child.constructor.name);
    }

    public push(e: Klassische): void {
        this._queue.push(e);
    }

    private isQueueEmpty(): boolean {
        return this._queue.length === 0;
    }

    private isNotNull(value: any): boolean {
        return value !== null;
    }
}