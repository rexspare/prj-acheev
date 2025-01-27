declare module globalThis {
  let sessionStorage: Storage;
}

class Storage {
  private data: Map<string, any>;

  constructor() {
    this.data = new Map<string, any>();
  }

  public getItem(key: string) {
    return this.data.get(key);
  }

  public setItem(key: string, value: any) {
    this.data.set(key, value);
  }
  public removeItem(key: string) {
    this.data.delete(key);
  }
  public clear() {
    this.data = new Map<string, any>();
  }

}

let appSessionStorage = globalThis.sessionStorage = (globalThis.sessionStorage ?? new Storage());

export { Storage, appSessionStorage };