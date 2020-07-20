import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRecepcionistaComponent } from './menu-recepcionista.component';

describe('MenuRecepcionistaComponent', () => {
  let component: MenuRecepcionistaComponent;
  let fixture: ComponentFixture<MenuRecepcionistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuRecepcionistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuRecepcionistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
