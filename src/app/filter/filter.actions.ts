import { Action } from '@ngrx/store';


export const SET_FILTER = '[Filter] Set Filtro';

export type filtrosValidos = 'all' | 'pending' | 'completed';


export class SetFilterAction implements Action {
    readonly type = SET_FILTER;
    constructor(public filtro: filtrosValidos) {
    }
}

export type Acciones = SetFilterAction;
