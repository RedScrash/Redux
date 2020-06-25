import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {
  public subscription: Subscription;
  public name: string;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private store: Store<AppState>
    ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.store.select('auth')
    .pipe(filter( ({user}) => user !== null )).subscribe(({user}) => {
      this.name = user.nombre;
    });
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
