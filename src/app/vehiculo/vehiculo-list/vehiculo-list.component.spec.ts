/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { faker } from "@faker-js/faker";
import { HttpClientModule } from '@angular/common/http';
import { VehiculoListComponent } from './vehiculo-list.component';
import { VehiculoService } from '../vehiculo.service';
import { Vehiculo } from '../vehiculo';

function randomNumbers(valMin: number, valMax: number) {
  return Math.floor(Math.random() * (valMax - valMin + 1)) + valMin;
}

describe('VehiculoListComponent', () => {
  let component: VehiculoListComponent;
  let fixture: ComponentFixture<VehiculoListComponent>;
  let debug: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [VehiculoListComponent],
      providers: [VehiculoService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculoListComponent);
    component = fixture.componentInstance;
    //Crate vehicles array
    component.vehiculos = []
    for (let index = 0; index < randomNumbers(3, 10); index++) {
      component.vehiculos.push(new Vehiculo(index, faker.vehicle.vehicle(), faker.vehicle.manufacturer(),
        faker.vehicle.model(), randomNumbers(1920, 2023), randomNumbers(1000, 100000), faker.vehicle.color(),
        faker.image.image()))
    }
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('Should create setup', () => {
    expect(component).toBeTruthy();
  });

  it('Should be exists the title of the application = TuSegundazo.com', () => {
    let title = 'TuSegundazo.com';
    let applicationTitleObtained = debug.query(By.css('h2#main-title'));
    expect(applicationTitleObtained.nativeElement.textContent.trim()).toBe(title);
  });

  it('Should be exists the application image', () => {
    expect(debug.query(By.css('img')).properties['src']).toBeTruthy();
  });

  it("Should return a list of vehicle names", () => {
    debug.queryAll(By.css('td#vehicle-brand')).forEach((td, i) => {
      expect(td.nativeElement.textContent).toContain(component.vehiculos[i].marca)
    });
  });

  it("Should return a list of vehicle lines", () => {
    debug.queryAll(By.css('td#vehicle-line')).forEach((td, i) => {
      expect(td.nativeElement.textContent).toContain(component.vehiculos[i].linea)
    });
  });

  it("Should return a list of vehicle models", () => {
    debug.queryAll(By.css('td#vehicle-model')).forEach((td, i) => {
      expect(td.nativeElement.textContent).toContain(component.vehiculos[i].modelo)
    });
  });

  it("Should return a list of summary of the brands", () => {
    expect(debug.query(By.css('div#summary-brands'))).toBeTruthy();
  });

  it("Should exists the application info footer, shoul contains info@tusegundazo.com", () => {
    expect(debug.query(By.css('div.text-center')).nativeElement.textContent).toContain('info@tusegundazo.com')
  });
});
