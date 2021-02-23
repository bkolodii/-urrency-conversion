import { ActionReducer, Action } from '@ngrx/store';

import * as currency from '../actions/amountCurr';

export function reducer(state: number = 1, action: currency.AmountCurrChangeAction) {
    switch (action.type) {
        case currency.AMOUNTCURRCHANGE:
            if(action.payload.length == 2){
                return action.payload[1].value / action.payload[0].value;
            } else{
                return state
            }
        default:
            return state;
    }
}
