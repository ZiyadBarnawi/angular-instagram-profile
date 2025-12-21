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
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Http } from '../services/http';
import { User } from '../models/user.model';
import { Images } from '../models/images.enum';
import { Users } from '../Data/users';
import { environment } from './../../environments/environment';
import { TextareaModule, Textarea } from 'primeng/textarea';
import { ConfirmDialogModule, ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { FocusTrapModule, FocusTrap } from 'primeng/focustrap';
import { catchError, Observable } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // For animations that occur on page-load
import { animate, trigger, state, style, transition } from '@angular/animations';
import { AvatarModule, Avatar } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { RippleModule } from 'primeng/ripple';
import { Router } from '@angular/router';
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
    ReactiveFormsModule,
    Textarea,

    AvatarModule,
    Avatar,
    AvatarGroupModule,
    RippleModule,
  ],
  animations: [
    trigger('hover', [
      state('mouseover', style({ transform: 'scale(1.5)' })),
      state('mouseout', style({ transform: 'scale(1)' })),
      transition('mouseout => mouseover', [animate(200)]),
      transition('mouseover => mouseouts', [animate(200)]),
    ]),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  http = inject(Http);
  router = inject(Router);
  form = new FormGroup({
    username: new FormControl('', { validators: [Validators.maxLength(20)] }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(5),
        (control) => {
          if (this.form?.controls?.username?.value === this.form?.controls?.password?.value) {
            this.usernameAndPasswordAreEqual = true;
            return { usernameAndPasswordAreEquals: true };
          } else {
            this.usernameAndPasswordAreEqual = false;
            return null;
          }
        },
      ],
    }),
    bio: new FormControl('', { validators: [Validators.maxLength(100)] }),
  });
  formArr = new FormArray([]);

  user = signal<User>(
    localStorage.getItem('users')
      ? JSON.parse(localStorage.getItem('users') as string)[0]
      : Users[0]
  );

  stories = signal<[{ src: string }]>([{ src: 'sunnyDay.jpg' }]);
  follow = signal<boolean>(false);
  messageVisible = signal<boolean>(false);

  usernameAndPasswordAreEqual = false;
  hovered = false;
  message = '';
  visibleRegisterDialog = false;
  visibleEditDialog = false;
  visibleDeleteDialog = false;
  messageSeverity = 'Success';

  // onUserChange(user: any): void {
  //   this.user.set(user);
  // }
  onFollowClick(): void {
    this.messageVisible.set(true);
    this.follow.set(!this.follow());
    this.showMessage(this.follow() ? 'Followed!' : 'Un-Followed', {
      success: this.follow(),
      severity: this.follow() ? 'success' : 'danger',
    });
  }

  showMessage(message: string, options = { success: true, severity: 'success' }) {
    this.messageVisible.set(true);
    this.message = message;
    this.messageSeverity = options.severity;
    setTimeout(() => {
      this.messageVisible.set(false);
      this.messageSeverity = 'success';
    }, 1500);
  }
  onFormSubmit(): void {
    let user: User = {
      username: this.form.controls.username.value!,
      password: this.form.controls.password.value!,
      pfp_url: Images[1],
    };

    this.http.register(user);
    this.showMessage('success');
  }
  async onEditClick() {
    let data = await this.http.editUser({
      username: this.user()!.username,
      bio: this.form.controls.bio.value,
      // pfp_url: Images[Math.floor(Math.random() * 5)],
    } as User);
    if (!data) return;

    // in spring dev
    if (environment.production) {
      data = data as Observable<Object>;
      data.subscribe((user: any) => {
        this.user.set(user.data);
      });
      this.showMessage('Success');
    }
    // in local dev
    else {
      this.user.set(data as User);
      this.showMessage('Success');
    }
  }

  async onDeleteClick() {
    this.http.deleteUser(this.user()!.username);
    this.user.set({ username: '', pfp_url: '', bio: '' });
  }

  async ngOnInit(): Promise<void> {
    this.router.events
      .pipe(
        catchError((err) => {
          throw err;
        })
      )
      .subscribe(async () => {
        let data = await this.http.getUsers(this.router.url.substring(1));
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
}
