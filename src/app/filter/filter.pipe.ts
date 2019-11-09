import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../todo/model/todo.model';

import * as fromFiltro from './filter.actions';

@Pipe({
  name: 'filterTodo'
})
export class FilterPipe implements PipeTransform {

  transform(todos: Todo[], filter: fromFiltro.filtrosValidos): Todo[] {
    switch (filter) {
      case 'completed':
        return todos.filter( item => item.completado);
      case 'pending':
        return todos.filter( item => !item.completado);
      default:
        return todos;
    }
  }

}
