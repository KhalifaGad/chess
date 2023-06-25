import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalDataPersistenceService {

  get(key: string) {
    return localStorage.getItem(key);
  }

  add(key: string, value: string | Record<string, unknown>) {
    const stringifiedValue = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, stringifiedValue);
  }


  remove(key: string) {
    localStorage.removeItem(key);
  }
}
