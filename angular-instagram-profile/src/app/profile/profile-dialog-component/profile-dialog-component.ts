import { Component, input } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile-dialog-component',
  imports: [Dialog, ButtonModule],
  templateUrl: './profile-dialog-component.html',
  styleUrl: './profile-dialog-component.css',
})
export class ProfileDialogComponent {
  onUpload($event: Event, arg1: any) {
    throw new Error('Method not implemented.');
  }
  user() {
    throw new Error('Method not implemented.');
  }
  onCitySearch($event: PointerEvent) {
    throw new Error('Method not implemented.');
  }
  onDayCheckboxChange(arg0: any) {
    throw new Error('Method not implemented.');
  }
  submit() {
    throw new Error('Method not implemented.');
    this.close();
  }

  close() {}

  onShowDialog = input<Function>();
  header = input<string>();
  visibleDialog: boolean = false;
  visibleSkipButton: boolean = false;
  visibleSaveButton: boolean = false;
  form = input<FormGroup>();
  useEmail: any;
  modal = input(true);
}
