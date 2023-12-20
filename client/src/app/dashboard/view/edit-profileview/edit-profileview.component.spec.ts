import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileviewComponent } from './edit-profileview.component';

describe('EditProfileviewComponent', () => {
  let component: EditProfileviewComponent;
  let fixture: ComponentFixture<EditProfileviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditProfileviewComponent]
    });
    fixture = TestBed.createComponent(EditProfileviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
