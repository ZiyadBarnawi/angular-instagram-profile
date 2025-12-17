import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, input, OnInit, signal } from '@angular/core';
import { Posts } from '../components/posts/posts';
import { ButtonModule } from 'primeng/button';
import { Navbar } from '../components/navbar/navbar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DrawerModule, Drawer } from 'primeng/drawer';
import { MessageModule, Message } from 'primeng/message';
import { DialogModule, Dialog } from 'primeng/dialog';
import { FloatLabelModule, FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup } from '@angular/forms';

import { Http } from '../services/http';
import { User } from '../models/user.model';
import { Images } from '../models/images.enum';
import { Users } from '../Data/users';
import { environment } from './../../environments/environment';
@Component({
  selector: 'app-profile',
  imports: [
    ButtonModule,
    Posts,
    Navbar,
    AutoCompleteModule,
    Drawer,
    Message,
    Dialog,
    FloatLabel,
    InputTextModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  http = inject(Http);
  async ngOnInit(): Promise<void> {
    console.log(environment);
  }
  signupFormGroup = new FormGroup({
    usernameControl: new FormControl('', []),
    passwordControl: new FormControl(''),
  });
  stories = signal<[{ src: string }]>([{ src: 'sunnyDay.jpg' }]);
  follow = signal<boolean>(false);
  showMessage = signal<boolean>(false);
  user = signal<User>(Users[0]);
  visibleDialog = false;

  onUserChange(user: any): void {
    this.user.set(user);
  }
  onFollowClick(): void {
    this.showMessage.set(true);

    this.follow.set(!this.follow());
    setTimeout(() => {
      this.showMessage.set(false);
    }, 1500);
  }
}
