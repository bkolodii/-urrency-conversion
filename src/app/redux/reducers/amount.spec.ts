import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { Store, StoreModule } from "@ngrx/store";
import { State } from "src/app/interfaces/state.interface";
import { reducers } from 'src/app/redux/reducers';
import { reducer } from "./amount"
import * as amount from "../actions/amount"
describe('Amount', () => {
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
    it(`should returm amount from reduser`, (() => {
        const initialState : number = 1;
        expect(reducer(initialState, new amount.AmountChangeAction(2))).toEqual(2)
      }))
      it(`should returm null from reduser`, (() => {
        const initialState : number = 1;
        expect(reducer(initialState, new amount.AmountChangeAction(null))).toBeNull()
      }))
});
