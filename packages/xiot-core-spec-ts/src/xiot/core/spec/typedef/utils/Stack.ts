
export class Stack<E> {
  private _storage: Array<E> = [];

  push(item: E): E {
    this._storage.push(item);
    return item;
  }

  pop(): E | undefined {
   return this._storage.pop();
  }

  peek(): E {
    const len = this._storage.length;
    if (len > 0) {
      return this._storage[len - 1];
    }

    throw new Error('EmptyStackException');
  }

  empty(): boolean {
    return this._storage.length === 0;
  }

  size(): number {
    return this._storage.length;
  }

  reverse() {
    this._storage = this._storage.reverse();
  }

  toString(): string {
    return `[${this._storage.join(', ')}]`;
  }
}
