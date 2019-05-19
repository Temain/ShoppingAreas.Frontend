import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaCoeffsComponent } from './area-coeffs.component';

describe('AreaCoeffsComponent', () => {
  let component: AreaCoeffsComponent;
  let fixture: ComponentFixture<AreaCoeffsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaCoeffsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaCoeffsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
