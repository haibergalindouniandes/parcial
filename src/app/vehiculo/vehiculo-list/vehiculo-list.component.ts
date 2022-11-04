import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../vehiculo';
import { VehiculoService } from '../vehiculo.service';

@Component({
  selector: 'app-vehiculo-list',
  templateUrl: './vehiculo-list.component.html',
  styleUrls: ['./vehiculo-list.component.css']
})
export class VehiculoListComponent implements OnInit {

  // Declare variables to use
  vehiculos: Array<Vehiculo> = [];
  listMarcas: [string, number][] = [];

  constructor(private vehiculoService: VehiculoService) { }

  getVehiculos(): void {
    this.vehiculoService.getVehiculos().subscribe((vehiculos) => {
      this.vehiculos = vehiculos;
      this.getCounMarcas(vehiculos);
    });
  }

  getCounMarcas(marcas: Array<Vehiculo>): void {
    for (let index = 0; index < marcas.length; index++) {
      let countMarcaVehiculo = 0;
      let marcaVehiculo = marcas[index].marca;
      let resultValidate = this.validateExistInArray(marcaVehiculo);
      if (!resultValidate[0]) {
        this.listMarcas.push([marcaVehiculo, 1]);
      }else{
        countMarcaVehiculo = this.listMarcas[resultValidate[1] as number][1];
        this.listMarcas[resultValidate[1] as number][1] = countMarcaVehiculo + 1;
      }
    }
  }

  validateExistInArray(valueToSearch: string) {
    for (let index = 0; index < this.listMarcas.length; index++) {
      if (this.listMarcas[index][0] == valueToSearch) {
        return [true, index];
      }
    }
    return [false, 0];
  }

  ngOnInit() {
    this.getVehiculos();
  }

}
