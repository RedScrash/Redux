import { Component, OnInit } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { ResetAction } from '../contador.actions';
import { AppState } from '../../app.reducers';

@Component({
  selector: 'app-nieto',
  templateUrl: './nieto.component.html',
  styles: []
})
export class NietoComponent implements OnInit {

  contador: number;

  constructor(private store: Store<AppState>) {
    this.store.select('contador').subscribe(
      (contador) => {
        this.contador = contador;
      }
    )
  }

  ngOnInit() {
  }

  reset(){
    const action = new ResetAction();
    this.store.dispatch(action);
    //this.contador = 0;
    //this.reinicioContador.emit(this.contador);
  }

}
