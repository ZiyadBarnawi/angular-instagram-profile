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
import { catchError, filter, Observable, switchMap } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // For animations that occur on page-load
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
import { InputOtpModule } from 'primeng/inputotp';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { TreeTableModule } from 'primeng/treetable';
import { TableModule } from 'primeng/table';
import { PopoverModule } from 'primeng/popover';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-profile',
  imports: [
    SelectButtonModule,
    StepperModule,
    ButtonModule,
    Posts,
    InputGroupModule,
    InputGroupAddonModule,
    AutoCompleteModule,
    Message,
    Dialog,
    FloatLabel,
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
  today = new Date(Date.now());

  contactToggleOptions = ['Phone', 'Email'];
  useEmail = true;
  genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'female', value: 'female' },
  ];
  accountOptions = [
    { label: 'Personal', value: 'personal' },
    { label: 'Business', value: 'business' },
  ];
  categories: string[] = ['Cloths', 'Glasses'];
  discounts: string[] = ['Random Discount'];
  pricingOption = ['Fixed', 'Hourly', 'Negotiable'];
  cities = [
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
  uploadedFiles?: [{ name: string; size: string }];
  userForm = new FormGroup({
    username: new FormControl('', { validators: [Validators.maxLength(20)] }),
    phoneNumber: new FormControl('', {
      validators: [
        Validators.minLength(8),
        (control) => {
          if (/^[+-]?\d+$/.test(control.value)) return { notValidPhoneNumber: true };
          return null;
        },
        (control) => {
          if (!this.userForm?.controls?.email.value && !control?.value) {
            return { NUllEmailAndPassword: true };
          }
          return null;
        },
      ],
    }),
    email: new FormControl('', {
      validators: [
        Validators.email,
        (control) => {
          if (!this.userForm?.controls?.email.value && !control?.value) {
            return { NUllEmailAndPassword: true };
          }
          return null;
        },
      ],
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
          if (this.userForm?.controls.password.value !== control.value)
            return { passwordMismatch: true };

          return null;
        },
      ],
    }),

    pfpUrl: new FormControl<File[]>([], {}),
    bio: new FormControl('', { validators: [Validators.maxLength(100)] }),
    dateOfBirth: new FormControl('', {}),
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
    paymentMethods: new FormControl([], {
      validators: [Validators.required],
    }),
    category: new FormControl<string>('', { validators: [] }), // This is used to handle the new category
    discount: new FormControl<string>('', { validators: [] }), // This is used to handle the new discount
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
        price: new FormControl(0, { validators: [Validators.required, Validators.min(0)] }),
        categories: new FormControl('', { validators: [Validators.required] }),
        discounts: new FormControl<string[]>([], { validators: [Validators.maxLength(50)] }),
      }),
    ]),
    workHours: new FormArray([
      new FormControl<{ day: string; available: boolean; flexible: boolean }>({
        day: 'Saturday',
        available: false,
        flexible: false,
      }),
      new FormControl<{ day: string; available: boolean; flexible: boolean }>({
        day: 'Sunday',
        available: false,
        flexible: false,
      }),
      new FormControl<{ day: string; available: boolean; flexible: boolean }>({
        day: 'Monday',
        available: false,
        flexible: false,
      }),
      new FormControl<{ day: string; available: boolean; flexible: boolean }>({
        day: 'Tuesday',
        available: false,
        flexible: false,
      }),
      new FormControl<{ day: string; available: boolean; flexible: boolean }>({
        day: 'Wednesday',
        available: false,
        flexible: false,
      }),
      new FormControl<{ day: string; available: boolean; flexible: boolean }>({
        day: 'Thursday',
        available: false,
        flexible: false,
      }),
      new FormControl<{ day: string; available: boolean; flexible: boolean }>({
        day: 'Friday',
        available: false,
        flexible: false,
      }),
    ]),
  });

  user = signal<User>(
    localStorage.getItem('users')
      ? JSON.parse(localStorage.getItem('users') as string)[0]
      : Users[0]
  );

  stories = signal<[{ src: string }]>([{ src: 'sunnyDay.jpg' }]);
  follow = signal<boolean>(false);
  messageVisible = signal<boolean>(false);
  hovered = false;
  message = '';
  visibleRegisterDialog = false;
  visibleEditDialog = false;
  visibleDeleteDialog = false;
  messageSeverity = 'Success';

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
      username: this.userForm.controls.username.value!,
      password: this.userForm.controls.password.value!,
      pfpUrl: Images[1],
    };

    this.http.register(user);
    this.showMessage('success');
  }
  async onEditClick() {
    let data = await this.http.editUser({
      username: this.user()!.username,
      bio: this.userForm.controls.bio.value,
      // pfpUrl: Images[Math.floor(Math.random() * 5)],
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
        price: new FormControl(0, { validators: [Validators.required, Validators.min(0)] }),
        categories: new FormControl('', { validators: [Validators.required] }),
        discounts: new FormControl(this.discounts),
      })
    );
  }
  async onDeleteClick() {
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

  onTestSub(): void {
    console.log(this.userForm.value);
  }

  onNewCategory(): void {
    this.categories.push(this.userForm.controls.category.value!);
  }
  onNewDiscount(): void {
    console.log(this.userForm.controls.discount.value);

    this.discounts.push(this.userForm.controls.discount.value!);
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
  }
}
