// loading.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);

  setLoading(loading: boolean): void {
    this.loadingSubject.next(loading);
  }

  isLoading() {
    return this.loadingSubject.asObservable();
  }
}