import { Action } from '@ngrx/store';
import { CurrencyItems } from '../../interfaces/currencyItem';

export const HISTORYCURRCHANGE = '[HistoryCurr] Change';

export class HistoryCurrChangeAction implements Action {
    type = HISTORYCURRCHANGE;

    constructor(public payload: Array<Array<CurrencyItems>>) {}
}
