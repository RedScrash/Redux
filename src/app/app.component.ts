import { Component } from '@angular/core';
import { contadorReducer } from './shared/reducer';
import { store } from '@angular/core/src/render3';
import { incrementar, decrementar } from './shared/action';
import { Store } from '@ngrx/store';

interface AppState{
  contador:number;
}

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
    this.store.subscribe(state => {
        this.contador = state.contador;
      }
    );
  }
  incrementar(){
    //1.this.contador +=1;
    this.store.dispatch(incrementar);
  }
  decrementar(){
    //1.this.contador -=1;
    this.store.dispatch(decrementar);
  }
}
