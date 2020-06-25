import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { IngresoEgresoState } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  public ingrespEgreso: IngresoEgreso[] = [];
  public subscription: Subscription;

  constructor(
    private store: Store<IngresoEgresoState>,
    private service: IngresoEgresoService
  ) { }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.store.select('ingresosEgresos').pipe(filter( state => state.items.length > 0))
    .subscribe(({ items }) => {
      this.ingrespEgreso = items;
    });
  }

  public borrar(uid: string) {
    console.log(uid);
    this.service.borrarIngresoEgreso(uid)
    .then( () => Swal.fire( 'Borrado', 'Item Borrado', 'success'))
    .catch( (err) => Swal.fire( 'Error', err.message, 'error'));
  }

}
