import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  public formGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
    this.formGroup = this._formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });
  }

  public crearUsuario( ) {
    const {nombre, correo, password} = this.formGroup.value;
    if (this.formGroup.invalid) {
      return;
    }
    Swal.fire({
      title: 'Espere por favor',
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });
    this._authService.crearUsuario(nombre, correo, password)
    .then( credenciales => {
      console.log(credenciales);
      Swal.close();
      this._router.navigate(['/']);
    })
    .catch( error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message
      });
    });
  }

}
