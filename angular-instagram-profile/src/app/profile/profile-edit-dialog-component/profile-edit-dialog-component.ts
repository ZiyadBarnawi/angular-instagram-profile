import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FileUploadModule } from 'primeng/fileupload';
import { AvatarModule } from 'primeng/avatar';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CheckboxModule } from 'primeng/checkbox';
import { Dialog, DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';

import { environment, User, UserService } from '../../components/index';
import { TextareaModule } from 'primeng/textarea';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-edit-dialog-component',
  standalone: true,
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
    DialogModule,
    Dialog,
    InputTextModule,
    TextareaModule,
  ],
  templateUrl: './profile-edit-dialog-component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrl: './profile-edit-dialog-component.css',
})
export class ProfileEditDialogComponent implements OnInit {
  userService = inject(UserService);
  messageService = inject(MessageService);
  router = inject(Router);
  async submitForm() {
    if (environment.production) {
    } else {
      console.log(this.userService.userForm.value);
      console.log(this.userService.userForm.value);

      let user = (await this.userService.editUser()) as User;
      // this.userService.user.set();
    }
    this.router.navigate(['/profile', `${this.userService.user()?.username}`], {
      replaceUrl: true,
    }); //replaceUrl === the user can't navigate back to this url

    this.messageService.add({ summary: 'Updated successfully' });
    this.router.navigate(['/profile', `${this.userService.user()?.username}`], {
      replaceUrl: true,
    }); //replaceUrl === the user can't navigate back to this url
  }

  ngOnInit(): void {
    this.userService.userForm.patchValue(this.userService.user()!);
  }
}
