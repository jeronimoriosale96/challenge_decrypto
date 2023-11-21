import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private isLoading = new BehaviorSubject<Boolean>(false)
  public isLoading$ = this.isLoading.asObservable()

  public show(){
    this.isLoading.next(true)
  }

  public hide(){
    this.isLoading.next(false)
  }


}
