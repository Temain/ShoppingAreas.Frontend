import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaProductComponent } from './area-product.component';

describe('AreaProductComponent', () => {
  let component: AreaProductComponent;
  let fixture: ComponentFixture<AreaProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
