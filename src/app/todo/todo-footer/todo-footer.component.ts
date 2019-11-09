import { Component, OnInit } from '@angular/core';

import * as fromFiltro from '../../filter/filter.actions';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { Todo } from '../model/todo.model';

import * as fromTodoActions from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: []
})
export class TodoFooterComponent implements OnInit {

  public filtrosValidos: fromFiltro.filtrosValidos[] = ['all', 'completed', 'pending'];
  public actualFilter: fromFiltro.filtrosValidos;
  public pendientes: number;

  constructor(private _store: Store<AppState>) { }

  ngOnInit() {
    this._store.subscribe( state => {
      this.actualFilter = state.filtro;
      this._contarPendientes(state.todos);
    });
  }

  public cambiarFiltro(newFilter: fromFiltro.filtrosValidos): void {
    const action = new fromFiltro.SetFilterAction(newFilter);
    this._store.dispatch(action);
  }

  private _contarPendientes(todos: Todo[]): void {
    this.pendientes = todos.filter( item => !item.completado ).length;
  } 

  private clearCompleted(): void {
    const action = new fromTodoActions.ClearCompleted();
    this._store.dispatch(action);
  }
}
