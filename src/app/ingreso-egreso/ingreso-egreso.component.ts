import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import * as actions from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  public loading = false;
  public form: FormGroup;
  public tipo = 'ingreso';
  public subscription: Subscription;
  constructor(
    private builder: FormBuilder,
    private service: IngresoEgresoService,
    private store: Store<AppState>
    ) { }
  ngOnInit() {
    this.form = this.builder.group({
      description: ['', Validators.required],
      monto: [0, Validators.required],
    });
    this.subscription = this.store.select('ui').subscribe((result) => {
      this.loading = result.isLoading;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public guardar() {
    if (this.form.invalid) { return; }
    const {description, monto} = this.form.value;
    const ingresoEgreso = new IngresoEgreso(description, monto, this.tipo);
    this.store.dispatch(actions.isLoading());
    this.service.crearIngresoEgreso(ingresoEgreso)
    .then(() => {
      this.form.reset();
      this.store.dispatch(actions.stopLoading());
      Swal.fire( 'Agregado', description, 'success');
    })
    .catch((err) => {
      console.error(err);
      this.store.dispatch(actions.stopLoading());
      Swal.fire( 'Error!', err.message, 'error');
    });
  }

}
