import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private _authService: AuthService,
    private _router: Router) {}


  canLoad(): boolean | Observable<boolean> | Promise<boolean> {
    return this._authService.isAuth().pipe(
      tap( state => {
        if (!state) {
          this._router.navigate(['/login']);
        }
      }),
      take(1)// Cancela la subscripción
    );
  }

  public canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._authService.isAuth().pipe(
      tap( state => {
        if (!state) {
          this._router.navigate(['/login']);
        }
      })
    );
  }
}
