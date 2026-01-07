import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, signal } from '@angular/core';
import { Posts } from '../../components/posts/posts.component';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { User } from '../../models/user.model';
import { ToastModule, Toast } from 'primeng/toast';
import { environment } from '../../../environments/environment';
import { AvatarModule, Avatar } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { Router } from '@angular/router';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { MessageService } from 'primeng/api';
import { UserService } from '../../services/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable, catchError } from 'rxjs';
import { ProfileSignupDialogComponent } from '../profile-signup-dialog-component/profile-signup-dialog-component';
@Component({
  selector: 'app-profile',
  imports: [
    ButtonModule,
    Posts,
    Dialog,
    AvatarModule,
    Avatar,
    AvatarGroupModule,
    OverlayBadgeModule,
    ToastModule,
    ReactiveFormsModule,
    ProfileSignupDialogComponent,
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class Profile implements OnInit {
  userService = inject(UserService);
  userForm = this.userService.userForm;
  router = inject(Router);
  messagesServices = inject(MessageService);
  visibleEditDialog = this.userService.visibleEditDialog;
  visibleDeleteDialog = this.userService.visibleDeleteDialog;
  visibleSignupDialog = this.userService.visibleSignupDialog;

  user = this.userService.user;

  stories = signal<[{ src: string }]>([{ src: 'sunnyDay.jpg' }]);
  isFollowed = signal<boolean>(false);
  messageVisible = signal<boolean>(false);
  message = '';
  messageSeverity = 'success';

  onFollowClick(): void {
    this.messageVisible.set(true);
    this.isFollowed.set(!this.isFollowed());
    this.userService.showToast({
      summary: this.isFollowed() ? 'Followed!' : 'Un-Followed',
      severity: this.isFollowed() ? 'success' : 'error',
    });
  }

  onDeleteClick() {
    this.userService.deleteUser(this.user()!.username);
    this.user.set(null);
  }

  ngOnInit(): void {
    this.userService.user.set(this.userService.getInitialUser());
    this.router.events.subscribe(async () => {
      let data = await this.userService.getUsers(this.router.url.substring(1));
      console.log(data);

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
      console.log(data);

      this.user.set(data as User);
    });
  }
}
