import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDealershipComponent } from './form-dealership.component';

describe('FormDealershipComponent', () => {
  let component: FormDealershipComponent;
  let fixture: ComponentFixture<FormDealershipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormDealershipComponent]
    });
    fixture = TestBed.createComponent(FormDealershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
