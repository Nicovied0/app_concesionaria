import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddealershipsComponent } from './adddealerships.component';

describe('AdddealershipsComponent', () => {
  let component: AdddealershipsComponent;
  let fixture: ComponentFixture<AdddealershipsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdddealershipsComponent]
    });
    fixture = TestBed.createComponent(AdddealershipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
