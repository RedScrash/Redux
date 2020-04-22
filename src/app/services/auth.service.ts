import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth,
    public firestore: AngularFirestore) { }

  public initAuthListener() {
    this.auth.authState.subscribe();
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
