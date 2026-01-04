import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, input, OnInit, signal } from '@angular/core';
import { PostsComponent } from '../components/posts/posts.component';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DialogModule, Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Http } from '../services/http.service';
import { User } from '../models/user.model';
import { ToastModule, Toast } from 'primeng/toast';
import { environment } from '../../environments/environment';
import { catchError, filter, Observable, switchMap } from 'rxjs';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // For animations that occur on page-load
import { animate, trigger, state, style, transition } from '@angular/animations';
import { AvatarModule, Avatar } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { RippleModule } from 'primeng/ripple';
import { NavigationEnd, Router } from '@angular/router';
import { StepperModule } from 'primeng/stepper';
import { DatePickerModule } from 'primeng/datepicker';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputMaskModule } from 'primeng/inputmask';
import { RatingModule } from 'primeng/rating';
import { PasswordModule, Password } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MultiSelectModule } from 'primeng/multiselect';
import { FileUploadModule } from 'primeng/fileupload';
import { TreeSelectModule } from 'primeng/treeselect';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CascadeSelectModule, CascadeSelect } from 'primeng/cascadeselect';
import { SelectModule } from 'primeng/select';
import { InputOtpChangeEvent, InputOtpModule } from 'primeng/inputotp';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { TreeTableModule } from 'primeng/treetable';
import { TableModule } from 'primeng/table';
import { PopoverModule } from 'primeng/popover';
import { CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { user } from '../data/dummyUser';
import { MessageService, ToastMessageOptions } from 'primeng/api';
import { StyleClassModule } from 'primeng/styleclass';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-profile',
  imports: [
    SelectButtonModule,
    StepperModule,
    ButtonModule,
    PostsComponent,
    InputGroupModule,
    StyleClassModule,
    InputGroupAddonModule,
    AutoCompleteModule,
    Dialog,
    InputTextModule,
    ReactiveFormsModule,
    InputNumberModule,
    DatePickerModule,
    AvatarModule,
    TableModule,
    Avatar,
    AvatarGroupModule,
    CheckboxModule,
    InputMaskModule,
    RatingModule,
    OverlayBadgeModule,
    PasswordModule,
    RadioButtonModule,
    MultiSelectModule,
    FileUploadModule,
    TreeSelectModule,
    ToggleSwitchModule,
    RippleModule,
    Password,
    CascadeSelectModule,
    SelectModule,
    InputOtpModule,
    TextareaModule,
    PopoverModule,
    TreeTableModule,
    ToastModule,
    Toast,
    DatePipe,
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
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  providers: [MessageService],
})
export class ProfileComponent implements OnInit {
  http = inject(Http);
  router = inject(Router);
  messages = inject(MessageService);
  today = new Date(Date.now());

  contactToggleOptions = ['Phone', 'Email'];
  useEmail = true;
  genderOptions = [
    { label: 'Male', value: 'M' },
    { label: 'female', value: 'F' },
  ];
  accountOptions = [
    { label: 'Personal', value: 'personal' },
    { label: 'Business', value: 'business' },
  ];
  categories: string[] = ['Cloths', 'Glasses'];
  discounts: string[] = ['Random Discount'];
  salaryOption = ['Fixed', 'Hourly', 'Negotiable'];
  paymentMethodsOptions: string[] = ['Mada', 'ApplePay', 'GooglePay', 'StcPay'];
  cities = [
    'Madinah',
    'Mecca',
    'Riyadh',
    'Asir',
    'Buraydah',
    'Tabuk',
    'Baha',
    'Hail',
    'Najran',
    'Northern Borders',
    'Eastern Province',
    'Al-Qassim',
    'AL-Jouf',
  ];
  suggestedCities: string[] = [];
  uploadedFiles?: any[] = [];
  otp = new FormControl<string>('', {
    validators: [
      Validators.required,
      (control) => {
        if (control.value.length < 4) return { invalidOtp: true };
        if (control.value !== '0000') return { invalidOtp: true };
        return null;
      },
    ],
  });
  userForm = new FormGroup({
    username: new FormControl('', { validators: [Validators.maxLength(20)] }),
    phoneNumber: new FormControl('', {
      validators: [
        Validators.minLength(8),
        (control) => {
          if (/^[+-]?\d+$/.test(control.value)) {
            return { notValidPhoneNumber: true };
          }
          return null;
        },
        (control) => {
          if (!this.userForm?.controls?.email.value && !control?.value) {
            console.log('This is the issue');

            return { NullEmailAndPassword: true };
          }
          return null;
        },
      ],
    }),
    email: new FormControl('', {
      validators: [Validators.email],
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(5),
        (control) => {
          if (
            this.userForm?.controls?.username?.value === this.userForm?.controls?.password?.value
          ) {
            return { usernameAndPasswordAreEquals: true };
          } else {
            return null;
          }
        },
      ],
    }),
    confirmPassword: new FormControl('', {
      validators: [
        Validators.required,
        (control) => {
          if (this.userForm?.controls.password.value !== control.value) {
            return { passwordMismatch: true };
          }
          return null;
        },
      ],
    }),
    pfpUrl: new FormControl(),
    bio: new FormControl('', { validators: [Validators.maxLength(100)] }),
    dateOfBirth: new FormControl<string | null>(null),
    gender: new FormControl<'M' | 'F'>('M', { validators: [Validators.required] }),
    city: new FormControl('', { validators: [Validators.required] }),
    commercialPaper: new FormControl(),
    commercialRegistryNumber: new FormControl(),
    iban: new FormControl('', {
      validators: [
        (control) => {
          if (this.userForm?.controls?.accountType?.value === 'business' && control.value === '')
            return { nullIban: true };
          return null;
        },
      ],
    }),
    accountType: new FormControl<'personal' | 'business'>('personal', {
      validators: [Validators.required],
    }),
    paymentMethods: new FormControl<string[]>([], {
      validators: [Validators.required],
    }),
    newCategory: new FormControl<string>(''), // This is used to handle the new category
    newDiscount: new FormControl<string>(''), // This is used to handle the new discount
    products: new FormArray([
      new FormGroup({
        name: new FormControl('Demo', {
          validators: [
            Validators.required,
            Validators.minLength(0),
            Validators.maxLength(75),
            (control) => {
              if (/^[a-zA-Z0-9_ ]*$/.test(control.value)) return null;

              return { unexpectedCharacters: true };
            },
          ],
        }),
        price: new FormControl<string>('', {
          validators: [Validators.required, Validators.min(0)],
        }),
        categories: new FormControl('', { validators: [Validators.required] }),
        discounts: new FormControl<string[]>([], { validators: [Validators.maxLength(50)] }),
      }),
    ]),
    workHours: new FormArray([
      new FormGroup({
        day: new FormControl<string>('Saturday'),
        available: new FormControl<boolean>(false),
        flexible: new FormControl<boolean>(false),
        openHours: new FormControl(''),
        closeHours: new FormControl(''),
      }),
      new FormGroup({
        day: new FormControl<string>('Sunday'),
        available: new FormControl<boolean>(false),
        flexible: new FormControl<boolean>(false),
        openHours: new FormControl(''),
        closeHours: new FormControl(''),
      }),
      new FormGroup({
        day: new FormControl<string>('Monday'),
        available: new FormControl<boolean>(false),
        flexible: new FormControl<boolean>(false),
        openHours: new FormControl(''),
        closeHours: new FormControl(''),
      }),
      new FormGroup({
        day: new FormControl<string>('Tuesday'),
        available: new FormControl<boolean>(false),
        flexible: new FormControl<boolean>(false),
        openHours: new FormControl(''),
        closeHours: new FormControl(''),
      }),
      new FormGroup({
        day: new FormControl<string>('Wednesday'),
        available: new FormControl<boolean>(false),
        flexible: new FormControl<boolean>(false),
        openHours: new FormControl(''),
        closeHours: new FormControl(''),
      }),
      new FormGroup({
        day: new FormControl<string>('Thursday'),
        available: new FormControl<boolean>(false),
        flexible: new FormControl<boolean>(false),
        openHours: new FormControl(''),
        closeHours: new FormControl(''),
      }),
      new FormGroup({
        day: new FormControl<string>('Friday'),
        available: new FormControl<boolean>(false),
        flexible: new FormControl<boolean>(false),
        openHours: new FormControl(''),
        closeHours: new FormControl(''),
      }),
    ]),
  });

  user = signal<User>(this.getInitialUser());
  getInitialUser(): User {
    let users: string | null = localStorage.getItem('users');
    if (users) return JSON.parse(localStorage.getItem('users') as string)[0];
    else return user;
  }
  stories = signal<[{ src: string }]>([{ src: 'sunnyDay.jpg' }]);
  follow = signal<boolean>(false);
  messageVisible = signal<boolean>(false);
  message = '';
  visibleRegisterDialog = false;
  visibleEditDialog = false;
  visibleDeleteDialog = false;
  messageSeverity = 'success';
  showToast(toastOptions: ToastMessageOptions | ToastMessageOptions[], multi?: boolean): void {
    if (multi) this.messages.addAll(toastOptions as ToastMessageOptions[]);
    else this.messages.add(toastOptions as ToastMessageOptions);
    //TIP: toastOptions:
    // this.messages.add({
    //   closable: false,
    //   summary: 'Top short text',
    //   detail: 'Long description',
    //   severity: 'success',
    //   life: 1500,
    //   text: 'Text',
    //   sticky: true,
    // });
  }
  onFollowClick(): void {
    this.messageVisible.set(true);
    this.follow.set(!this.follow());
    this.showToast({
      summary: this.follow() ? 'Followed!' : 'Un-Followed',
      severity: this.follow() ? 'success' : 'error',
    });
  }

  onFormSubmit(): void {
    const invalidForms = Object.entries(this.userForm.controls)
      .filter(([_, control]) => control.invalid)
      .map(([name]) => name);
    if (invalidForms.length) {
      this.showToast({
        summary: `Some inputs are invalid`,
        detail: invalidForms.join(', \n'),
        severity: 'error',
      });
      this.userForm.reset();
    }

    this.http.register(this.userForm);
    this.showToast({ summary: 'Success' });
  }
  async onEditClick() {
    let data = await this.http.editUser(this.user().username, this.userForm.value as User);
    if (!data) return;

    // in spring dev
    if (environment.production) {
      data = data as Observable<Object>;
      data.subscribe((user: any) => {
        this.user.set(user.data);
      });
      this.showToast({ summary: 'Success' });
    }
    // in local dev
    else {
      this.user.set(data as User);
      this.showToast({ summary: 'Success' });
    }
  }
  onAddNewItem() {
    this.userForm.controls.products.push(
      new FormGroup({
        name: new FormControl('Demo', {
          validators: [
            Validators.required,
            Validators.minLength(0),
            Validators.maxLength(75),
            (control) => {
              if (/^[a-zA-Z0-9_]*$/.test(control.value)) return null;
              return { unexpectedCharacters: true };
            },
          ],
        }),
        price: new FormControl<string>('0', {
          validators: [Validators.required, Validators.min(0)],
        }),
        categories: new FormControl('', { validators: [Validators.required] }),
        discounts: new FormControl(this.discounts),
      })
    );
  }
  onDeleteClick() {
    this.http.deleteUser(this.user()!.username);
    this.user.set({ username: '', pfpUrl: '', bio: '', password: '123456' });
  }
  onCitySearch(event: any) {
    this.suggestedCities = this.cities.filter((_city) =>
      _city.toLowerCase().includes(event.query.toLowerCase())
    );
  }
  onAccountTypeChange(event: any) {
    this.userForm.controls.accountType.setValue(event.value.toLowerCase());
  }

  onNewCategory(): void {
    this.categories.push(this.userForm.controls.newCategory.value!);
  }
  onNewDiscount(): void {
    this.discounts.push(this.userForm.controls.newDiscount.value!);
  }
  onDayCheck(control: FormControl, event: CheckboxChangeEvent) {
    control.setValue(event.checked);
  }
  onUpload(event: any, control: FormControl<any>): void {
    console.log(event);

    let filesCopy: any[] = [];
    event.files.forEach((file: any) => filesCopy.push(URL.createObjectURL(file)));
    control.setValue(filesCopy);
  }
  onDayCheckboxChange(control: FormControl): void {
    if (control.disabled) control.enable();
    else control.disable();
  }
  onShowEditDialog(): void {
    this.updateUserForm();
  }
  updateUserForm(): void {
    Object.entries(this.userForm.controls).forEach((control) => {
      this.userForm.reset();
      this.userForm.patchValue({ ...this.user() });
    });
  }
  ngOnInit(): void {
    // FIX: still needs work
    // this.router.events
    //   .pipe(
    //     filter((event) => event instanceof NavigationEnd),
    //     switchMap(() => this.http.getUsers(this.router.url.substring(1)))
    //   )
    //   .subscribe({
    //     next: (data) => {
    //       console.log(data);

    //       // this.user.set(data);
    //     },
    //     error: (err) => {
    //       console.error(err);
    //     },
    //   });

    this.router.events.subscribe(async () => {
      let data = await this.http.getUsers(this.router.url.substring(1));
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
    this.http.GetJsonUser().subscribe((data) => {
      console.log(data);

      this.user.set(data as User);
    });
  }
}
