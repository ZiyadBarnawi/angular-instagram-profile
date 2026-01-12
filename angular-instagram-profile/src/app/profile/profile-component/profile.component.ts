import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  inject,
  signal,
  input,
  effect,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { Observable, catchError, firstValueFrom, take } from 'rxjs';

import { Button } from 'primeng/button';
import { Avatar } from 'primeng/avatar';
import { MessageService } from 'primeng/api';

import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment';
import { ProfileSignupDialogComponent } from '../profile-signup-dialog-component/profile-signup-dialog-component';
import { ProfileEditDialogComponent } from '../profile-edit-dialog-component/profile-edit-dialog-component';
import { ProfileDeleteDialogComponent } from '../profile-delete-dialog-component/profile-delete-dialog-component';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { Posts } from '../../components/posts/posts.component';
@Component({
  selector: 'app-profile',
  imports: [Button, Avatar, ReactiveFormsModule, RouterOutlet, RouterLinkWithHref, Posts],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class Profile implements OnInit {
  userService = inject(UserService);
  http = inject(HttpClient);
  userForm = this.userService.userForm;
  router = inject(Router);
  messagesService = inject(MessageService);
  username = input<string>(); // TIP: this get its value form the url
  user = this.userService.user;

  stories = signal<[{ src: string }]>([{ src: 'sunnyDay.jpg' }]);
  isFollowed = signal<boolean>(false);
  messageVisible = signal<boolean>(false);
  message = '';
  messageSeverity = 'success';

  toggleFollow(): void {
    this.messageVisible.set(true);
    this.isFollowed.set(!this.isFollowed());
    this.messagesService.add({
      summary: this.isFollowed() ? 'Followed!' : 'Un-Followed',
      severity: this.isFollowed() ? 'success' : 'error',
    });
  }

  constructor() {
    effect(async () => {
      let data = await this.userService.getUsers(this.username());
      if (environment.production) {
        data = data as Observable<Object>;
        data
          .pipe(
            catchError((err) => {
              throw err;
            })
          )
          .subscribe((data: any) => {
            this.user.set(data.data);
          });
      } else {
        data = data as User;
        this.user.set(data);
      }
    });
  }
  async ngOnInit(): Promise<void> {
    let userObservable = this.http.get('data/user.json');
    let user = (await firstValueFrom(userObservable)) as User;

    this.user.set(user);
    this.router.events.subscribe(async () => {
      let data = await this.userService.getUsers(this.username());

      if (environment.production) {
        data = data as Observable<Object>;
        data
          .pipe(
            catchError((err) => {
              throw err;
            })
          )
          .subscribe((data: any) => {
            this.user.set(data.data);
          });
      } else {
        data = data as User;
        this.user.set(data);
      }
    });
    this.userService.GetJsonUser().subscribe((data) => {
      this.user.set(data as User);
    });
  }
}
