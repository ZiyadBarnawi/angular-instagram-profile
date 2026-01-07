import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSignupDialogComponent } from './profile-signup-dialog-component';

describe('ProfileSignupDialogComponent', () => {
  let component: ProfileSignupDialogComponent;
  let fixture: ComponentFixture<ProfileSignupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileSignupDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileSignupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
