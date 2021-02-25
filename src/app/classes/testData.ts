// import { Observable } from 'rxjs/Observable';
// import { of } from 'rxjs'

import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/Observable/of';
import {  testData, testHistory } from '../interfaces/testData';

export class DataStub {

  public getCurrency(): Observable<any> {
    return of(testData);
  }
  public getCurrHisrory(data: number): Observable<any> {
    return of(testData);
  }
  public history = {
      next(data : any){
      this.test = testHistory
    },
    subscribe() : Observable<any>{
      return of(testHistory)
    }
  }
  
}
