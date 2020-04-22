import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  public cerrarSesion() {
    this._authService.cerrarSesion()
    .then( () => {
      this._router.navigate(['/login']);
    })
    .catch( () => {
      this._router.navigate(['/login']);
    });
  }
}
