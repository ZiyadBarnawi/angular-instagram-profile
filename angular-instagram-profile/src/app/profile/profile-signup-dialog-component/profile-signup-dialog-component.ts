import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { ReactiveFormsModule } from '@angular/forms';
import { InputGroup, InputGroupModule } from 'primeng/inputgroup';
import { Button, ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FileUploadModule } from 'primeng/fileupload';
import { CheckboxModule } from 'primeng/checkbox';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { UserService } from '../../services/user.service';
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
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile-signup-dialog-component',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    InputGroupAddon,
    ReactiveFormsModule,
    InputGroup,
    Button,
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
  user = signal<User | null>(null);

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
    this.userService.userForm.reset();
    this.messagesService.add({
      summary: 'Success!',
      detail: 'User added successfully',
      severity: 'success',
    });
    this.userService.visibleSignupDialog = false;
  }
}
