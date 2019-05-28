import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { MultiplicarAction, DividirAction } from '../contador.actions';


@Component({
  selector: 'app-hijo',
  templateUrl: './hijo.component.html',
  styles: []
})
export class HijoComponent implements OnInit {
  contador: number;
  constructor( private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('contador').subscribe(
      contador => {
        this.contador = contador;
      }
    );
  }

  multiplicar(){
    const action = new MultiplicarAction(5);
    this.store.dispatch(action);
    //this.contador *=2;
    //this.cambioContador.emit(this.contador);
  }
  dividir(){
    const action = new DividirAction(5);
    this.store.dispatch(action);
    //this.contador /=2;
    //.cambioContador.emit(this.contador);
  }
  resetNieto(evento){
    this.contador = evento;
    //this.cambioContador.emit(this.contador);
  }

}
