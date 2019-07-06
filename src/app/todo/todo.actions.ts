import { Action } from '@ngrx/store';

export const AGREGAR_TODO = '[TODO] Agregar todo';
export const TOGGLE_TOD = '[TODO] Cambiar todo';
export const EDITAR_TODO = '[TODO] Editar todo';
export const ELIMINAR_TODO = '[TODO] Eliminar todo';

export class AgregarTodoAction implements Action {
    readonly type = AGREGAR_TODO;
    constructor(public texto: string) { }
}
export class ToggleTodoAction implements Action {
    readonly type = TOGGLE_TOD;
    constructor(public id: number) { }
}
export class EditarTodoAction implements Action {
    readonly type = EDITAR_TODO;
    constructor(public id: number, public text: string) { }
}
export class EliminarTodoAction implements Action {
    readonly type = ELIMINAR_TODO;
    constructor(public id: number) { }
}

export type Acciones = AgregarTodoAction | ToggleTodoAction | EditarTodoAction | EliminarTodoAction;
