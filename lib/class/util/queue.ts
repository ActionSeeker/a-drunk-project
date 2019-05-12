import { Klassische } from "../klassiche";

export class Queue {

    private _queue: Klassische[] = [];

    process() {
        while (!this.isQueueEmpty()) {
            const enqueued: Klassische | undefined = this._queue.shift();
            if (enqueued) {
                // For the sake of the TypeScript
                let parsed: any = enqueued.getParsedEntity();
                Object.keys(parsed).forEach((key: string) => {
                    if (parsed.hasOwnProperty(key) && this.isNotNull(parsed[key])) {
                        const value = parsed[key];
                        if (value.constructor.name === 'array') {
                            // It is an array of elements
                            // Some logic to extract a class from all the elements of the array
                        } else if (value.constructor.name === 'Object') {
                            // Another JSON object
                            const child = new Klassische(JSON.stringify(value), enqueued);
                            // Push the child as the next element in the queue
                            this.push(child);
                            // Then, push this child in the parent object
                            enqueued.addToPropMap(key, child.constructor.name);
                        } else {
                            // Then it is a qualified key
                            enqueued.addToPropMap(key, value.constructor.name);
                        }
                    }
                });
            }
        }
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