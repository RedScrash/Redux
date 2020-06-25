import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(
    private fireStore: AngularFirestore,
    private authService: AuthService
  ) { }

  public crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    delete ingresoEgreso.uid;
    return this.fireStore.doc(`${this.authService.user.uid}/ingresos-egresos`)
    .collection('items')
    .add({...ingresoEgreso});
  }

  public initIngresosEgresosListener(uid: string) {
    return this.fireStore.collection(`${uid}/ingresos-egresos/items`)
    .snapshotChanges()
    .pipe(map( item => {
      return item.map( doc => {
        return {
          uid: doc.payload.doc.id,
          ...doc.payload.doc.data() as {}
        };
      });
    }));
  }

  public borrarIngresoEgreso(uidItem: string) {
    const uid = this.authService.user.uid;
    return this.fireStore.doc(`${uid}/ingresos-egresos/items/${uidItem}`).delete();
  }
}
