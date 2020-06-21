import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as uiActions from 'src/app/shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy{
  public loginForm: FormGroup;
  public loading = false;
  public uiSubscription: Subscription;
  constructor(private _formBuilder: FormBuilder, private _authService: AuthService, private _router: Router,
    private store: Store<AppState>) { }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
    this.uiSubscription = this.store.select('ui').subscribe((state) => {
      console.log('cargando subs');
      this.loading = state.isLoading;
    });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }


  public loginUsario() {
    const {email, password} = this.loginForm.value;
    if (this.loginForm.invalid) {
      return;
    }

    this.store.dispatch(uiActions.isLoading());
    // Swal.fire({
    //   title: 'Espere por favor',
    //   onBeforeOpen: () => {
    //     Swal.showLoading();
    //   }
    // });

    this._authService.loginUsuario(email, password)
    .then( result => {
      console.log(result);
      // Swal.close();
      this.store.dispatch(uiActions.stopLoading());
      this._router.navigate(['/']);
    })
    .catch( error => {
      this.store.dispatch(uiActions.stopLoading());
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message
      });
    });
  }

}
