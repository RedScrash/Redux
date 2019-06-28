import { Action } from '@ngrx/store';


export const AGREGAR_TODO = '[TODO] Agregar todo';
export const TOGGLE_TOD = '[TODO] Cambiar todo';

export class AgregarTodoAction implements Action {
    readonly type = AGREGAR_TODO;
    constructor(public texto: string) {
    }
}

export class ToggleTodoAction implements Action {
    readonly type = TOGGLE_TOD;
    constructor(public id: number){}
}

export type Acciones = AgregarTodoAction | ToggleTodoAction;