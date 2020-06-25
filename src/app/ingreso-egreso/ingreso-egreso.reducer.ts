import { createReducer, on } from '@ngrx/store';
import * as actions from './ingreso-egreso.actions';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AppState } from '../app.reducer';

export interface State {
    items: IngresoEgreso[];
}

export interface IngresoEgresoState extends AppState {
    ingresosEgresos: State;
}

export const initialState: State = {
    items: [],
};

const _ingresosEgresosReducer = createReducer(initialState,

    on(actions.setItems, (state, {items}) => ({ ...state, items: [...items]})),
    on(actions.unSetItems, state => ({ ...state, items: []})),

);

export function ingresosEgresosReducer(state, action) {
    return _ingresosEgresosReducer(state, action);
}
