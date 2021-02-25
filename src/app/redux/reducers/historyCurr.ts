import * as history from '../actions/historyCurr';
import { History } from '../../interfaces/historyCurr';
export const startState: History = {
    result: [],
    date: []
}

export function reducer(state: History = startState, action: history.HistoryCurrChangeAction) {
    switch (action.type) {
        case history.HISTORYCURRCHANGE:
            if (action.payload.length == 2) {
                let result: Array<number> = [];
                let date: Array<string> = [];
                for (let i = 0; i < action.payload[0].length; i++) {
                    for (let j = 0; j < action.payload[1].length; j++) {
                        if (action.payload[0][i].data == action.payload[1][j].data) {
                            result.push(action.payload[1][j].value / action.payload[0][i].value)
                            date.push(action.payload[0][i].data)
                        }
                    }
                }
                return {
                    result: result,
                    date: date
                };
            } else {
                return state;
            }
        default:
            return state;
    }
}
