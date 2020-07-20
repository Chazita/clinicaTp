import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReseniaDialogComponent } from './resenia-dialog.component';

describe('ReseniaDialogComponent', () => {
  let component: ReseniaDialogComponent;
  let fixture: ComponentFixture<ReseniaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReseniaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReseniaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
