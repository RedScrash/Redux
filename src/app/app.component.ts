import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromContador from './contador/contador.actions';
import { AppState } from './app.reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'redux-app';
  contador: number;

  constructor(private store: Store<AppState>){
    //1.this.contador = 10;
    this.store.select('contador').subscribe(contador => {
        //this.contador = state.contador;
        this.contador = contador;
      }
    );
  }
  incrementar(){
    //1.this.contador +=1;
    const accion = new fromContador.IncrementarAction();
    this.store.dispatch(accion);
  }
  decrementar(){
    //1.this.contador -=1;
    const accion =  new fromContador.DecrementarAction();
    this.store.dispatch(accion);
  }
}
