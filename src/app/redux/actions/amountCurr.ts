import { Action } from '@ngrx/store';
import { CurrencyItems } from '../../interfaces/currencyItem';

export const AMOUNTCURRCHANGE = '[AmountCurr] Change';

export class AmountCurrChangeAction implements Action {
    type = AMOUNTCURRCHANGE;

    constructor(public payload: Array<CurrencyItems>) {}
}
