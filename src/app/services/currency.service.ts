import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CurrencyItems } from '../interfaces/currencyItem';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  history: Subject<Array<Array<CurrencyItems>>> = new Subject<Array<any>>()
  updateDate: Subject<number> = new Subject<number>()
  constructor(private http: HttpClient) { }

  getCurrency(): Observable<any> {
    return this.http.get("https://api.exchangeratesapi.io/latest")
  }
  getCurrHisrory(code: number) : Observable<any>{
    return this.http.get(`https://api.exchangeratesapi.io/${code}-01-01`)
  }
}
