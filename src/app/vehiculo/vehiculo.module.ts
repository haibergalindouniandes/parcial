import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VehiculoListComponent } from './vehiculo-list/vehiculo-list.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule
  ],
  exports: [VehiculoListComponent],
  declarations: [VehiculoListComponent]
})
export class VehiculoModule { }
