import { Component, inject } from '@angular/core';
import { FileUploadEvent, FileUploadModule } from 'primeng/fileupload';
import { AvatarModule } from 'primeng/avatar';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { CheckboxModule } from 'primeng/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile-edit-dialog-component',
  imports: [
    FileUploadModule,
    AvatarModule,
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
    InputMaskModule,
    DatePickerModule,
    SelectButtonModule,
    AutoCompleteModule,
    CheckboxModule,
    ReactiveFormsModule,
    DatePipe,
  ],
  templateUrl: './profile-edit-dialog-component.html',
  styleUrl: './profile-edit-dialog-component.css',
})
export class ProfileEditDialogComponent {
  userService = inject(UserService);
  userForm = this.userService.userForm;
  user = this.userService.user;
  onUpload($event: FileUploadEvent, arg1: any) {
    throw new Error('Method not implemented.');
  }

  useEmail: any;
  today: Date | null | undefined;
  genderOptions: any[] | undefined;
  onCitySearch($event: AutoCompleteCompleteEvent | PointerEvent) {
    throw new Error('Method not implemented.');
  }
  suggestedCities: any[] = [];
  paymentMethodsOptions: any;
  onDayCheckboxChange(arg0: any) {
    throw new Error('Method not implemented.');
  }
  visibleRegisterDialog: any;
  onEditClick() {
    throw new Error('Method not implemented.');
  }
}
