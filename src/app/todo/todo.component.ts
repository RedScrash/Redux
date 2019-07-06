import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';
import { Todo } from './model/todo.model';
import { ToggleTodoAction } from './todo.actions';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styles: []
})
export class TodoComponent implements OnInit {
  todosComplete = false;
  todos: Todo[] = [];
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.subscribe( state => {
      this.todos = state.todos;
    });
  }

  toggleAll() {
    let action;
    for (let todo of this.todos) {
      if (todo.completado === this.todosComplete) {
        action = new ToggleTodoAction(todo.id);
        this.store.dispatch(action);
      }
    }
    this.todosComplete = !this.todosComplete;
  }
}
