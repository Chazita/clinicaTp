import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoClienteComponent } from './turno-cliente.component';

describe('TurnoClienteComponent', () => {
  let component: TurnoClienteComponent;
  let fixture: ComponentFixture<TurnoClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnoClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
