import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';

import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {
  public ingresos: number;
  public egresos: number;

  public totalIngresos: number;
  public totalEgresos: number;

  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: MultiDataSet = [
    []
  ];

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.select('ingresosEgresos').subscribe(({items}) => {
      this.generarEstadistica(items);
    });
  }

  public generarEstadistica(items: IngresoEgreso[]) {
    this.totalIngresos = 0;
    this.totalEgresos = 0;
    this.ingresos = 0;
    this.egresos = 0;
    items.filter( item => item.tipo === 'ingreso').forEach( (item) => {
      this.ingresos++;
      this.totalIngresos += item.monto;
    });
    items.filter( item => item.tipo === 'egreso').forEach( (item) => {
      this.egresos++;
      this.totalEgresos += item.monto;
    });

    this.doughnutChartData = [[this.totalIngresos, this.totalEgresos]];
  }

}
