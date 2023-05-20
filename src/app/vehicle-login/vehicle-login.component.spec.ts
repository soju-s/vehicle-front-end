import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleLoginComponent } from './vehicle-login.component';

describe('VehicleLoginComponent', () => {
  let component: VehicleLoginComponent;
  let fixture: ComponentFixture<VehicleLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
