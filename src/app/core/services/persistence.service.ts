import { Inject, Injectable, InjectionToken, PLATFORM_ID } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PersistanceService {
  public get(key: string): unknown {
    try {
      const data = localStorage?.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch {
      console.error(
        'An error occurred while getting data from the local storage.'
      );
      return null;
    }
  }

  public set(key: string, data: unknown): void {
    try {
      localStorage?.setItem(key, JSON.stringify(data));
    } catch {
      console.error(
        'An error occurred while saving data to the local storage.'
      );
    }
  }

  public remove(key: string): void {
    try {
      localStorage?.removeItem(key);
    } catch {
      console.error(
        'An error occurred while saving data to the local storage.'
      );
    }
  }
}
