import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoeffsListComponent } from './coeffs-list.component';

describe('CoeffsListComponent', () => {
  let component: CoeffsListComponent;
  let fixture: ComponentFixture<CoeffsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoeffsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoeffsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
