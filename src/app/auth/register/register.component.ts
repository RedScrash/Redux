import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import * as actions from 'src/app/shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  public formGroup: FormGroup;
  public subscription: Subscription;
  public loading = false;

  constructor(private _formBuilder: FormBuilder, private _authService: AuthService, private _router: Router,
    private store: Store<AppState>) { }


  ngOnInit() {
    this.formGroup = this._formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });
    this.subscription = this.store.select('ui').subscribe((state) => {
      this.loading = state.isLoading;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public crearUsuario( ) {
    const {nombre, correo, password} = this.formGroup.value;
    if (this.formGroup.invalid) {
      return;
    }
    this.store.dispatch(actions.isLoading());
    // Swal.fire({
    //   title: 'Espere por favor',
    //   onBeforeOpen: () => {
    //     Swal.showLoading();
    //   }
    // });
    this._authService.crearUsuario(nombre, correo, password)
    .then( credenciales => {
      console.log(credenciales);
      this.store.dispatch(actions.stopLoading());
      // Swal.close();
      this._router.navigate(['/']);
    })
    .catch( error => {
      this.store.dispatch(actions.stopLoading());
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message
      });
    });
  }

}
