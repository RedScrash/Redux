import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as actions from '../ingreso-egreso/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy{

  public subscription: Subscription[] = [];
  constructor(
    private store: Store<AppState>,
    private service: IngresoEgresoService
    ) { }

  ngOnDestroy(): void {
    this.subscription[0].unsubscribe();
    this.subscription[1].unsubscribe();
  }

  ngOnInit() {
    this.subscription = [...this.subscription,
      this.store.select('auth').pipe(filter( (auth) => auth.user !== null)).subscribe((auth) => {
        console.log(auth.user);
        this.subscription = [...this.subscription,
          this.service.initIngresosEgresosListener(auth.user.uid)
          .subscribe( (result: any) => {
            this.store.dispatch(actions.setItems({ items: result}));
          })
        ];
      })
    ];
  }

}
