import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(
    private fireStore: AngularFirestore,
    private authService: AuthService
  ) { }

  public crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    return this.fireStore.doc(`${this.authService.user.uid}/ingresos-egresos`)
    .collection('items')
    .add({...ingresoEgreso});
  }
}
