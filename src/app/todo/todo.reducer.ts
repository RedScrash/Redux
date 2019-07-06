import * as fromTodo from './todo.actions';
import { Todo } from './model/todo.model';

const todo1 = new Todo('Vencer a Thanos');
const todo2 = new Todo('Salvar al mundo');
const todo3 = new Todo('Salva al mundo IronMan');
todo3.completado = true;
const estadoInicial: Todo[] = [todo1, todo2, todo3];

export function todoReducer(state= estadoInicial, action: fromTodo.Acciones): Todo[] {
    switch (action.type) {
        case fromTodo.AGREGAR_TODO:
            const todo = new Todo(action.texto);
            // El operador spread permite clonar el state, y agregar un nuevo elemento al final
            // del arreglo
            return [...state, todo];
        case fromTodo.TOGGLE_TOD:
            // El operador map() funciona como un foreach recorre todos los elementos
            // que se encuentran en el state, devuelve un nuevo array de elementos
            return state.map( todoEdit => {
                if (todoEdit.id === action.id) {
                    // El operador spread "..." permite clonar el elemento, adicionalmente permite cambiar
                    // las propiedades del objecto clonado "...todoEdit, completado: !todoEdit.completado"
                    // para este caso clona el objeto todoEdit y luego permite cambiar la propiedad
                    // completado
                    return {
                        ...todoEdit,
                        completado: !todoEdit.completado
                    };
                } else {
                    return todoEdit;
                }
            });
        case fromTodo.EDITAR_TODO:
            return state.map(todoEdit => {
                if (todoEdit.id === action.id) {
                    return {
                        ...todoEdit,
                        texto: action.text
                    };
                } else {
                    return todoEdit;
                }
            });
        case fromTodo.ELIMINAR_TODO:
            // return state.map( todoEdit => {
            //     if ( todoEdit.id !== action.id) {
            //         return todoEdit;
            //     }
            // });
            return state.filter( todoItem => todoItem.id !== action.id);
        default:
            return state;
    }
}
