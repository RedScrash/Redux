import { createReducer, on } from '@ngrx/store';
import { increment } from './counter.actions';

export interface State {
    key: String; 
}

export const initialState: State = {
   key: 'hola',
}

const _counterReducer = createReducer(initialState,

    on(increment, state => ({ ...state, key: 'hola'})),

);

export function counterReducer(state, action) {
    return _counterReducer(state, action);
}