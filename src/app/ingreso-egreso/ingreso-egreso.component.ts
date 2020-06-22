import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit {

  public form: FormGroup;
  public tipo = 'ingreso';
  constructor(
    private builder: FormBuilder,
    private service: IngresoEgresoService
    ) { }

  ngOnInit() {
    this.form = this.builder.group({
      description: ['', Validators.required],
      monto: [0, Validators.required],
    });
  }

  public guardar() {
    if (this.form.invalid) { return; }
    const {description, monto} = this.form.value;
    const ingresoEgreso = new IngresoEgreso(description, monto, this.tipo);
    this.service.crearIngresoEgreso(ingresoEgreso)
    .then(() => {
      this.form.reset();
      Swal.fire( 'Agregado', description, 'success');
    })
    .catch((err) => {
      console.error(err);
      Swal.fire( 'Error!', err.message, 'error');
    });
  }

}
