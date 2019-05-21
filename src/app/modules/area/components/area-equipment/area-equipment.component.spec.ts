import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaEquipmentComponent } from './area-equipment.component';

describe('AreaEquipmentComponent', () => {
  let component: AreaEquipmentComponent;
  let fixture: ComponentFixture<AreaEquipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaEquipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
