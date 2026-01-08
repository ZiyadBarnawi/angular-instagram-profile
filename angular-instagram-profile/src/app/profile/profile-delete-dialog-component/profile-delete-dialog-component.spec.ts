import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDeleteDialogComponent } from './profile-delete-dialog-component';

describe('ProfileDeleteDialogComponent', () => {
  let component: ProfileDeleteDialogComponent;
  let fixture: ComponentFixture<ProfileDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileDeleteDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
