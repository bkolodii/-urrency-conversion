import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CurrencyItems } from 'src/app/interfaces/currencyItem';
import { State } from 'src/app/interfaces/state.interface';
import { AmountChangeAction } from 'src/app/redux/actions/amount';
import { AmountCurrChangeAction } from 'src/app/redux/actions/amountCurr';
import { CurrencyService } from 'src/app/services/currency.service';
import * as fromRoot from "../../redux/reducers";

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {
  public amountFrom$: Observable<number>;
  amountTo: number;
  currencies: Array<CurrencyItems> = [];
  currSelect: Array<CurrencyItems> = [];
  historyAll: Array<Array<CurrencyItems>> = [[], []];
  selectedCurrencyTo: string = '';
  selectedCurrencyFrom: string = '';
  updated: number;
  yearFrom: number;
  yearTo: number;
  constructor(public store: Store<State>, public currService: CurrencyService) {
    this.amountFrom$ = store.select(fromRoot.getAmountState);
  }

  ngOnInit() {
    this.getCurrency();
  }
  getCurrency() {
    this.currService.getCurrency().subscribe(data => {
      this.currencies = Object.keys(data.rates).map(key => {
        return { code: key, value: data.rates[key] };
      });
      this.updated = +data.date.substr(0, 4);
    });
  }

  currencyFrom(currItem: CurrencyItems) {
    this.currSelect = JSON.parse(JSON.stringify(this.currSelect));
    this.currSelect[0] = currItem;
    this.historyAll = JSON.parse(JSON.stringify(this.historyAll));
    this.historyAll[0] = JSON.parse(JSON.stringify(this.historyAll[0]));
    this.historyAll[0] = [];
    for (let i = (this.yearFrom ? this.yearFrom : 2015); i < (this.yearTo ? this.yearTo + 1 : this.updated + 1); i++) {
      this.currService.getCurrHisrory(i).subscribe(data => {
        Object.keys(data.rates).map(
          key => {
            if (key == currItem.code) {
              this.historyAll = JSON.parse(JSON.stringify(this.historyAll))
              this.historyAll[0].push({
                code: key,
                value: data.rates[key],
                data: data.date
              })
            }
          });
        if (i == (this.yearTo ? this.yearTo : this.updated)) {
          this.currService.history.next(this.historyAll);
          this.exchange();
        }
      })

    }
  }

  currencyTo(currItem: CurrencyItems) {
    this.currSelect = JSON.parse(JSON.stringify(this.currSelect));
    this.currSelect[1] = currItem;
    this.historyAll = JSON.parse(JSON.stringify(this.historyAll));
    this.historyAll[1] = JSON.parse(JSON.stringify(this.historyAll[1]));
    this.historyAll[1] = [];
    for (let i = this.yearFrom ? this.yearFrom : 2015; i < (this.yearTo ? this.yearTo + 1 : this.updated + 1); i++) {
      this.currService.getCurrHisrory(i).subscribe(data => {
        Object.keys(data.rates).map(
          key => {
            if (key == currItem.code) {
              this.historyAll = JSON.parse(JSON.stringify(this.historyAll))
              this.historyAll[1].push({
                code: key,
                value: data.rates[key],
                data: data.date
              })
            }
          });
        if (i == (this.yearTo ? this.yearTo : this.updated)) {
          this.currService.history.next(this.historyAll);
          this.exchange();
        }
      })
    }
  }

  ChangeCurr() {
    this.currSelect = JSON.parse(JSON.stringify(this.currSelect));
    this.historyAll = JSON.parse(JSON.stringify(this.historyAll));
    this.currSelect = this.currSelect.reverse();
    if (this.currSelect[0]) this.selectedCurrencyFrom = this.currSelect[0].code;
    if (this.currSelect[1]) this.selectedCurrencyTo = this.currSelect[1].code;
    this.historyAll = this.historyAll.reverse();
    this.currService.history.next(this.historyAll);
    this.exchange();
  }

  exchange() {
    this.store.dispatch(new AmountCurrChangeAction(this.currSelect));
    this.store.subscribe(data => {
      this.amountTo = +(data.amount * fromRoot.getCurrnecyRates(data)).toFixed(2);
    })
  }

  onAmountChange(amount: string) {
    const number = parseFloat(amount);
    if (!isNaN(number)) this.store.dispatch(new AmountChangeAction(number));
    this.store.subscribe(data => {
      this.amountTo = +(data.amount * fromRoot.getCurrnecyRates(data)).toFixed(2);
    })
  }

  onYearToChange(year: string) {
    const number = parseInt(year);
    if (number <= this.updated && number > 1999) {
      this.yearTo = number;
      if (this.currSelect[0] && this.currSelect[1]) {
        this.currencyFrom(this.currSelect[0]);
        this.currencyTo(this.currSelect[1]);
      }
    }
  }

  onYearFromChange(year: string) {
    const number = parseInt(year);
    if (number > 1999 && number < this.updated) {
      this.yearFrom = number;
      if (this.currSelect[0] && this.currSelect[1]) {
        this.currencyFrom(this.currSelect[0]);
        this.currencyTo(this.currSelect[1]);
      }
    }
  }

}


