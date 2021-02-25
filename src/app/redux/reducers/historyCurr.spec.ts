import { Store, StoreModule } from "@ngrx/store";
import { State } from "src/app/interfaces/state.interface";
import { reducers } from 'src/app/redux/reducers';
import { reducer, startState } from "./historyCurr"
import * as amount from "../actions/historyCurr"
import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { testHistory } from "src/app/interfaces/testData";
describe('historyCurr', () => {
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
        expect(reducer(startState, new amount.HistoryCurrChangeAction(testHistory)).result.length).toBeGreaterThan(0)
      }))
    it(`should return NaN from reduser`, (() => {
        const curr  = [[{
                  code: "",
                  value: 0
                }], [{
                  code: "",
                  value: 0
                }]]
        expect(reducer(startState, new amount.HistoryCurrChangeAction(curr)).date[0]).toBeUndefined()
      }))
});
