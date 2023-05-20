import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclePaymentComponent } from './vehicle-payment.component';

describe('VehiclePaymentComponent', () => {
  let component: VehiclePaymentComponent;
  let fixture: ComponentFixture<VehiclePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiclePaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiclePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
