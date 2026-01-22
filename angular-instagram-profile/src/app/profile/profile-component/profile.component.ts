import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  inject,
  signal,
  input,
  effect,
  DestroyRef,
  Injector,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet, RouterLinkWithHref, ResolveFn } from '@angular/router';

import {
  Observable,
  catchError,
  concatMap,
  exhaustMap,
  firstValueFrom,
  forkJoin,
  fromEvent,
  interval,
  map,
  switchMap,
  take,
  throttle,
  throttleTime,
  timeout,
  timer,
} from 'rxjs';
import { Button } from 'primeng/button';
import { Avatar } from 'primeng/avatar';
import { MessageService } from 'primeng/api';

import { PostsComponent } from '../../components/posts/posts.component';
import { UserService, environment, type User } from './../../components/index';
import { toSignal } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-profile',
  imports: [Button, Avatar, ReactiveFormsModule, RouterOutlet, RouterLinkWithHref, PostsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  // changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  userService = inject(UserService);
  messagesService = inject(MessageService);
  private destroyRed = inject(DestroyRef);
  private httpService = inject(HttpClient);
  private injector = inject(Injector);

  userForm = this.userService.userForm;
  user = this.userService.user;
  Images = this.userService.Images;

  username = input<string>(); // TIP: this get its value form the url
  text = input(); // TIP: This text is read as a static route data

  stories = signal<[{ src: string }]>([{ src: this.Images[3] }]);
  isFollowed = signal<boolean>(false);

  interval$ = interval(1000);
  signalObserver = toSignal(this.interval$, {
    initialValue: 0,
    equal: (
      a, //curr val
      b, // new val
    ) => {
      return a === b;
    },
    injector: inject(Injector),
    manualCleanup: true,
  });

  toggleFollow(): void {
    this.isFollowed.set(!this.isFollowed());
    this.messagesService.add({
      summary: this.isFollowed() ? 'Followed!' : 'Un-Followed',
      severity: this.isFollowed() ? 'success' : 'error',
    });
  }

  constructor() {
    effect(async () => {
      let user = await this.userService.getUsers(this.username());
      if (environment.production) {
        let userObservable = (user as Observable<Object>)
          .pipe(
            catchError((err) => {
              throw err;
            }),
          )
          .subscribe((data: any) => {
            this.user.set(data.data);
          });
        this.destroyRed.onDestroy(() => {
          userObservable.unsubscribe();
        });
      } else {
        this.userService.user.set(user as User);
      }
    });
  }

  async ngOnInit(): Promise<void> {
    this.destroyRed.onDestroy(() => {
      console.log('Destroyed');
    });
    console.log(this.text());
  }
}

export const resolveRouteData: ResolveFn<string> = (snapshot, routeState) =>
  "I'm a dynamic route text!✨";
export const resolveTitle: ResolveFn<string> = (
  routeSnapshot, //  Snapshot form ActivatedRoute
  routeState, //  Route Data
) => `ElmerGram | ${routeSnapshot?.paramMap.get('username')}`;
