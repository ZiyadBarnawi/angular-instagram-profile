import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  inject,
  signal,
  input,
  effect,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet, RouterLinkWithHref, ResolveFn } from '@angular/router';
import { Observable, catchError, firstValueFrom, take } from 'rxjs';

import { Button } from 'primeng/button';
import { Avatar } from 'primeng/avatar';
import { MessageService } from 'primeng/api';

import { PostsComponent } from '../../components/posts/posts.component';
import { UserService, environment, type User } from './../../components/index';
@Component({
  selector: 'app-profile',
  imports: [Button, Avatar, ReactiveFormsModule, RouterOutlet, RouterLinkWithHref, PostsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  userService = inject(UserService);
  http = inject(HttpClient);
  userForm = this.userService.userForm;
  router = inject(Router);
  messagesService = inject(MessageService);
  username = input<string>(); // TIP: this get its value form the url
  user = this.userService.user;
  Images = this.userService.Images;
  text = input(); // TIP: This text is read as a static route data
  stories = signal<[{ src: string }]>([{ src: this.Images[6] }]);
  isFollowed = signal<boolean>(false);
  message = '';
  messageSeverity = 'success';

  toggleFollow(): void {
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
        this.userService.user.set(data as User);
      }
    });
  }
  async ngOnInit(): Promise<void> {
    console.log(this.text());
  }
}

export const resolveRouteData: ResolveFn<string> = (snapshot, routeState) =>
  "I'm a dynamic route text!✨";
export const resolveTitle: ResolveFn<string> = (
  routeSnapshot, //  snapshot form ActivatedRoute
  routeState //  Route Data
) => `ElmerGram | ${routeSnapshot?.paramMap.get('username')}`;
