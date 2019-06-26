import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Herramientas de NGRX
import { StoreModule} from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { todoReducer } from './todo/todo.reducer';

// Formularios Reactivos
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';

// Componentes ToDo
import { FooterComponent } from './footer/footer.component';
import { TodoFooterComponent } from './todo/todo-footer/todo-footer.component';
import { TodoAddComponent } from './todo/todo-add/todo-add.component';
import { TodoItemComponent } from './todo/todo-item/todo-item.component';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { TodoComponent } from './todo/todo.component';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    TodoFooterComponent,
    TodoAddComponent,
    TodoItemComponent,
    TodoListComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ todos: todoReducer}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
