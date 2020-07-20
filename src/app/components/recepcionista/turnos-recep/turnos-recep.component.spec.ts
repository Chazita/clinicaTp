import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosRecepComponent } from './turnos-recep.component';

describe('TurnosRecepComponent', () => {
  let component: TurnosRecepComponent;
  let fixture: ComponentFixture<TurnosRecepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnosRecepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosRecepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
