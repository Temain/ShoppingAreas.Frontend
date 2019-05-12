import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcombComponent } from './breadcomb.component';

describe('BreadcombComponent', () => {
  let component: BreadcombComponent;
  let fixture: ComponentFixture<BreadcombComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreadcombComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcombComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
