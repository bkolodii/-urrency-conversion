import { Store, StoreModule } from "@ngrx/store";
import { State } from "src/app/interfaces/state.interface";
import { reducers } from 'src/app/redux/reducers';
import { reducer } from "./amountCurr"
import * as amount from "../actions/amountCurr"
import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { CurrencyItems } from "src/app/interfaces/currencyItem";
describe('AmountCurr', () => {
    let store: Store<State>;
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          StoreModule.forRoot(reducers),
        ],
        providers : [
            {
                provide: Store
            }
        ]
      }).compileComponents();
    });

    beforeEach(() => {
        store = TestBed.get(Store)
      });
    it(`should return  amountTo currency from reduser`, (() => {
        const initialState : number = 1;
        const curr  = [{
                  code: "HKD",
                  value: 9.4153
                }, {
                  code: "PHP",
                  value: 59.021
                }]
        expect(reducer(initialState, new amount.AmountCurrChangeAction(curr)).toFixed(2)).toEqual(6.27.toFixed(2))
      }))
    it(`should return NaN from reduser`, (() => {
        const initialState : number = 1;
        const curr  = [{
                  code: "",
                  value: 0
                }, {
                  code: "",
                  value: 0
                }]
        expect(reducer(initialState, new amount.AmountCurrChangeAction(curr))).toBeNaN()
      }))
});
