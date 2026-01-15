import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FileUploadModule } from 'primeng/fileupload';
import { CheckboxModule } from 'primeng/checkbox';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DialogModule } from 'primeng/dialog';
import { StepperModule } from 'primeng/stepper';
import { PasswordModule } from 'primeng/password';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { InputOtpModule } from 'primeng/inputotp';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { MessageService } from 'primeng/api';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-signup-dialog-component',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [
    InputGroupAddon,
    ReactiveFormsModule,
    InputMaskModule,
    DatePickerModule,
    SelectButtonModule,
    FileUploadModule,
    CheckboxModule,
    AutoCompleteModule,
    InputGroupModule,
    DialogModule,
    StepperModule,
    InputGroupModule,
    InputMaskModule,
    ButtonModule,
    PasswordModule,
    FileUploadModule,
    SelectButtonModule,
    TableModule,
    InputNumberModule,
    SelectModule,
    CheckboxModule,
    DatePickerModule,
    AutoCompleteModule,
    InputTextModule,
    TextareaModule,
    InputOtpModule,
  ],

  templateUrl: './profile-signup-dialog-component.html',
  styleUrl: './profile-signup-dialog-component.css',
})
export class ProfileSignupDialogComponent {
  userService = inject(UserService);
  messagesService = inject(MessageService);
  router = inject(Router);
  submitForm(): void {
    const invalidForms = Object.entries(this.userService.userForm.controls)
      .filter(([_, control]) => control.invalid)
      .map(([name]) => name);
    if (invalidForms.length) {
      this.messagesService.add({
        summary: `Some inputs are invalid`,
        detail: invalidForms.join(', \n'),
        severity: 'error',
      });
      return;
    }

    this.userService.addUser();
    if (this.userService.user()) {
      this.userService.user.update((user) => {
        Object.keys(user!).forEach((key) => {
          (user![key as keyof User] as any) =
            this.userService.userForm.value[key as keyof typeof this.userService.userForm.value];
        });
        return user;
      });
    } else {
      this.userService.user.set(this.userService.userForm.value as User);
    }
    this.userService.userForm.reset();
    this.messagesService.add({
      summary: 'Success!',
      detail: 'User added successfully',
      severity: 'success',
    });
    this.router.navigate(['/profile', `${this.userService.user()?.username}`], {
      replaceUrl: true,
    }); //replaceUrl === the user can't navigate back to this url
    this.userService.visibleSignupDialog = false;
  }
}
