import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCoeffsComponent } from './product-coeffs.component';

describe('ProductCoeffsComponent', () => {
  let component: ProductCoeffsComponent;
  let fixture: ComponentFixture<ProductCoeffsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCoeffsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCoeffsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
