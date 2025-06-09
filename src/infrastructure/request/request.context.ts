// src/infrastructure/request-context.ts
import { AsyncLocalStorage } from 'async_hooks';

export class RequestContext {
  private static asyncLocalStorage = new AsyncLocalStorage<Map<string, any>>();

  static run(fn: () => void) {
    const store = new Map<string, any>();
    this.asyncLocalStorage.run(store, fn);
  }

  static set(key: string, value: any) {
    const store = this.asyncLocalStorage.getStore();
    if (store) {
      store.set(key, value);
    }
  }

  static get(key: string) {
    const store = this.asyncLocalStorage.getStore();
    if (store) {
      return store.get(key);
    }
    return undefined;
  }
}
