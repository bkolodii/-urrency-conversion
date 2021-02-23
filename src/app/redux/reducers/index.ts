// import { Currency } from './../models/currency';

import { State } from 'src/app/interfaces/state.interface';
import * as fromAmount from './amount';
import * as fromCurrency from './amountCurr';
import * as fromHistory from './historyCurr';



export const reducers = {
    amount: fromAmount.reducer,
    currencies: fromCurrency.reducer,
    history: fromHistory.reducer
};

function getRank(state : State) : number{
   return state.currencies * state.amount
}
// Selectors
export const getAmountState = (state: State) => state.amount;

export const getCurrnecyRates = (state: State) => state.currencies;
export const getCurrnecyHistory = (state: State) => state.history;
