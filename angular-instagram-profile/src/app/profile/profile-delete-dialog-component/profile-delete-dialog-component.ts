import { Component, inject } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

import { UserService } from './../../components/index';

@Component({
  selector: 'app-profile-delete-dialog-component',
  imports: [ButtonModule, DialogModule],
  templateUrl: './profile-delete-dialog-component.html',
  styleUrl: './profile-delete-dialog-component.css',
})
export class ProfileDeleteDialogComponent {
  userService = inject(UserService);

  deleteUser() {
    this.userService.deleteUser(this.userService.user()!.username);
    this.userService.user.set(null);
  }
}
