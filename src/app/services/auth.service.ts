import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as actions from '../auth/auth.actions';
import { Subscription } from 'rxjs';
import * as ieActions from '../ingreso-egreso/ingreso-egreso.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public subscription: Subscription;
  private _user: Usuario;
  constructor(private auth: AngularFireAuth,
    public firestore: AngularFirestore,
    private store: Store<AppState>) { }

  public get user(): Usuario {
    return {...this._user};
  }

  public initAuthListener() {
    this.auth.authState.subscribe( (fuser) => {
      if (fuser) {
        this.subscription = this.firestore.doc(`${fuser.uid}/usuario`).valueChanges().subscribe((result: any) => {
          const myUser = Usuario.fromFirebase(result);
          this._user = myUser;
          this.store.dispatch(actions.setUser({user: myUser}));
        });
      } else {
        this._user = null;
        this.subscription.unsubscribe();
        this.store.dispatch(actions.unSetUser());
        this.store.dispatch(ieActions.unSetItems());
      }
    });
  }

  public crearUsuario (nombre: string, email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password)
    .then( ({user}) => {
      const newUser = new Usuario(user.uid, nombre, user.email);
      return this.firestore.doc(`${user.uid}/usuario`).set({...newUser});
    });

  }

  public loginUsuario (email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  public cerrarSesion() {
    return this.auth.signOut();
  }

  public isAuth() {
    return this.auth.authState.pipe(map(
      result => result !== null
    ));
  }
}
