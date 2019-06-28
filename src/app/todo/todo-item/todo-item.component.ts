import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../model/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { ToggleTodoAction } from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styles: []
})
export class TodoItemComponent implements OnInit {
  @Input() todoItem: Todo;
  @ViewChild('txtInputFisico') txtInputFisico: ElementRef;

  checkField: FormControl;
  txtInput: FormControl;
  editando: boolean;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    console.log(this.todoItem);
    this.checkField = new FormControl(this.todoItem.completado);
    this.txtInput = new FormControl(this.todoItem.texto, Validators.required);
    this.checkField.valueChanges.subscribe( () =>{
      const accion = new ToggleTodoAction(this.todoItem.id);
      this.store.dispatch(accion);
    });
  }

  editar(){
    this.editando = true;
    setTimeout( () => {
      this.txtInputFisico.nativeElement.select();
    }, 1);
  }
  terminarEdicion(){
    this.editando = false;
  }

}
