import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltesbyubicationComponent } from './filtesbyubication.component';

describe('FiltesbyubicationComponent', () => {
  let component: FiltesbyubicationComponent;
  let fixture: ComponentFixture<FiltesbyubicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiltesbyubicationComponent]
    });
    fixture = TestBed.createComponent(FiltesbyubicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
