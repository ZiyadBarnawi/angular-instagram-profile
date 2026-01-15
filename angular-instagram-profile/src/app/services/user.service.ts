import { inject, Injectable, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { catchError, Observable } from 'rxjs';
import { MessageService } from 'primeng/api';
import { FileUploadEvent } from 'primeng/fileupload';

// import { environment } from '../../environments/environment';
// import { User } from '../models/user.model';
import { Images, User, environment } from '../components/index';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);
  messagesService = inject(MessageService);
  visibleEditDialog = true;
  visibleSignupDialog = true;
  visibleDeleteDialog = true;
  user = signal<User | null>(null);
  Images = Images;
  // testSignal = signal(0);
  // computedSignal = computed(() => this.testSignal()); //TIP: computed signals are read-only. They change whenever the other signal changes
  // computedSignal = this.testSignal.asReadonly(); //TIP: Same as code above, but leaner
  contactToggleOptions = ['Phone', 'Email'];
  today = new Date(Date.now());

  useEmail = true;
  genderOptions = [
    { label: 'Male', value: 'M' },
    { label: 'Female', value: 'F' },
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

  userForm = new FormGroup({
    username: new FormControl('', { validators: [Validators.maxLength(20)] }),
    phoneNumber: new FormControl('', {
      validators: [],
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
    city: new FormControl('', {
      validators: [
        (control) => {
          if (this.userForm?.controls?.accountType?.value === 'business' && !control.value)
            return { nullIban: true };
          return null;
        },
      ],
    }),
    commercialPaper: new FormControl(),
    commercialRegistryNumber: new FormControl(),
    iban: new FormControl('', {
      validators: [
        (control) => {
          if (this.userForm?.controls?.accountType?.value === 'business' && !control.value)
            return { nullIban: true };
          return null;
        },
      ],
    }),
    accountType: new FormControl<'personal' | 'business'>('personal', {
      validators: [Validators.required],
    }),
    paymentMethods: new FormControl<string[]>([], {
      validators: [
        (control) => {
          if (this.userForm?.controls?.accountType?.value === 'business' && !control.value)
            return { nullIban: true };
          return null;
        },
      ],
    }),
    newCategory: new FormControl<string>(''), // This is used to handle the new category
    newDiscount: new FormControl<string>(''), // This is used to handle the new discount
    products: new FormArray([
      new FormGroup({
        name: new FormControl('Demo', {
          validators: [
            Validators.minLength(0),
            Validators.maxLength(75),
            (control) => {
              if (/^[a-zA-Z0-9_ ]*$/.test(control.value)) return null;

              return { unexpectedCharacters: true };
            },
            (control) => {
              if (this.userForm?.controls?.accountType?.value === 'business' && !control.value)
                return { nullIban: true };
              return null;
            },
          ],
        }),
        price: new FormControl<string>('', {
          validators: [
            (control) => {
              if (this.userForm?.controls?.accountType?.value === 'business' && !control.value)
                return { nullIban: true };
              return null;
            },
            Validators.min(0),
          ],
        }),
        categories: new FormControl('', {
          validators: [
            (control) => {
              if (this.userForm?.controls?.accountType?.value === 'business' && !control.value)
                return { nullIban: true };
              return null;
            },
          ],
        }),
        discounts: new FormControl<string[]>([], { validators: [Validators.maxLength(50)] }),
      }),
    ]),
    workHours: new FormArray([
      new FormGroup({
        day: new FormControl<string>('Saturday'),
        available: new FormControl<boolean>(false),
        flexible: new FormControl<boolean>(false),
        openHours: new FormControl<string | undefined>(''),
        closeHours: new FormControl(''),
      }),
      new FormGroup({
        day: new FormControl<string>('Sunday'),
        available: new FormControl<boolean>(false),
        flexible: new FormControl<boolean>(false),
        openHours: new FormControl<string | undefined>(''),
        closeHours: new FormControl(''),
      }),
      new FormGroup({
        day: new FormControl<string>('Monday'),
        available: new FormControl<boolean>(false),
        flexible: new FormControl<boolean>(false),
        openHours: new FormControl<string | undefined>(''),
        closeHours: new FormControl(''),
      }),
      new FormGroup({
        day: new FormControl<string>('Tuesday'),
        available: new FormControl<boolean>(false),
        flexible: new FormControl<boolean>(false),
        openHours: new FormControl<string | undefined>(''),
        closeHours: new FormControl(''),
      }),
      new FormGroup({
        day: new FormControl<string>('Wednesday'),
        available: new FormControl<boolean>(false),
        flexible: new FormControl<boolean>(false),
        openHours: new FormControl<string | undefined>(''),
        closeHours: new FormControl(''),
      }),
      new FormGroup({
        day: new FormControl<string>('Thursday'),
        available: new FormControl<boolean>(false),
        flexible: new FormControl<boolean>(false),
        openHours: new FormControl<string | undefined>(''),
        closeHours: new FormControl(''),
      }),
      new FormGroup({
        day: new FormControl<string>('Friday'),
        available: new FormControl<boolean>(false),
        flexible: new FormControl<boolean>(false),
        openHours: new FormControl<string | undefined>(''),
        closeHours: new FormControl(''),
      }),
    ]),
    otp: new FormControl<string>('', {
      validators: [
        Validators.required,
        (control) => {
          if (control?.value?.length < 4) return { invalidOtp: true };
          if (control.value !== '0000') return { invalidOtp: true };
          return null;
        },
      ],
    }),
  });
  GetJsonUser(): Observable<Object> {
    return this.http.get('data/user.json');
  }

  async getUsers(
    username?: string
  ): Promise<Observable<Object> | Promise<User[]> | Promise<User> | null> {
    // Spring environment
    if (environment?.production) {
      return this.http.get(`${environment?.apiUrl}/api/v1/users${username ? `/${username}` : ''}`, {
        headers: { 'ngrok-skip-browser-warning': 'true' },
        timeout: 20000,
      });
    }
    //Local environment
    else {
      if (username) {
        const users = JSON.parse(localStorage.getItem('users') as string) as User[];
        return users?.find((_user) => _user.username === username) as User;
      }

      return JSON.parse(localStorage.getItem('users') as string) as User[];
    }
  }
  async addUser(): Promise<void> {
    let users: User[] = JSON.parse(localStorage.getItem('users') as string) as User[];
    if (users) {
      // delete this.userForm.value.otp;
      // delete this.userForm.value.confirmPassword;
      let user: any = { ...this.userForm.value };
      user.posts = [
        { imgSrc: 'sunnyDay.jpg', likesCount: 13 },
        { imgSrc: 'desert.jpg', likesCount: 13 },
        { imgSrc: 'sunFlower.jpg', likesCount: 13 },
        { imgSrc: 'carbet.jpg', likesCount: 13 },
        { imgSrc: 'rainnyCar.jpg', likesCount: 13 },
      ];
      delete user.otp;
      delete user.confirmPassword;
      delete user.newDiscount;
      delete user.newCategory;
      // users.push(this.userForm.value as User);
      users.push(user);
      localStorage.setItem(`users`, JSON.stringify(users));
    }
    //first user
    else {
      localStorage.setItem('users', JSON.stringify([this.userForm.value]));
    }

    //! Production Code
    // if (environment.production) {
    //   this.http
    //     .post(`${environment?.apiUrl}/api/v1/users`, user)
    //     .pipe(
    //       catchError((err) => {
    //         throw err;
    //       })
    //     )
    //     .subscribe((data) => {});
    // } else {
    //   let users: any = localStorage.getItem('users');
    //   if (users) {
    //     users = JSON.parse(users);
    //     users.push(user);
    //     localStorage.setItem(`users`, JSON.stringify(users));
    //   }
    //   //First user in localStorage
    //   else {
    //     localStorage.setItem(
    //       'users',
    //       JSON.stringify([
    //         {
    //           username: user.username,
    //           password: user.password,
    //           pfpUrl: Images[Math.floor(Math.random() * 5)],
    //         } as User,
    //       ])
    //     );
    //   }
    // }
  }
  async editUser(): Promise<User | Observable<Object> | null> {
    if (environment.production) {
      return this.http
        .patch(
          `${environment.apiUrl}/api/v1/users/${this.userForm.value.username}`,
          this.userForm.value
        )
        .pipe(
          catchError((err) => {
            throw err;
          })
        );
    } else {
      let users = localStorage.getItem('users')
        ? (JSON.parse(localStorage.getItem('users') as string) as User[])
        : null;

      if (!users) return null;
      let oldUserIndex = users.findIndex((user) => user.username === this.user()!.username);
      if (oldUserIndex < 0) return null;
      users[oldUserIndex] = this.userForm.value as User;
      users[oldUserIndex].posts = [
        { imgSrc: 'sunnyDay.jpg', likesCount: 13 },
        { imgSrc: 'desert.jpg', likesCount: 13 },
        { imgSrc: 'sunFlower.jpg', likesCount: 13 },
        { imgSrc: 'carbet.jpg', likesCount: 13 },
        { imgSrc: 'rainnyCar.jpg', likesCount: 13 },
      ];

      let user: any = { ...this.userForm.value };

      localStorage.setItem('users', JSON.stringify(users));
      this.user.set(users[oldUserIndex]);

      return users[oldUserIndex];
    }
  }
  async deleteUser(username: string): Promise<void> {
    if (environment.production) {
      this.http.delete(`${environment.apiUrl}/api/v1/users/${username}`).subscribe((data) => {});
    } else {
      let users = JSON.parse(localStorage.getItem('users') as string) as User[];

      const deletedUserIndex = users.findIndex((user) => user.username === username);
      users.splice(deletedUserIndex, 1);
      localStorage.setItem('users', JSON.stringify(users));
    }
  }

  updateSuggestedCities(event: any) {
    this.suggestedCities = this.cities.filter((_city) =>
      _city.toLowerCase().includes(event.query.toLowerCase())
    );
  }

  uploadFile(event: FileUploadEvent, control: FormControl<any>): void {
    let filesCopy: any[] = [];
    event.files.forEach((file: any) => filesCopy.push(URL.createObjectURL(file)));
    control.setValue(filesCopy);
  }

  updateUserForm(): void {
    Object.entries(this.userForm.controls).forEach((control) => {
      this.userForm.reset();
      this.userForm.patchValue({ ...this.user() });
    });
  }

  addNewProduct() {
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

  addNewCategory(): void {
    this.categories.push(this.userForm.controls.newCategory.value!);
  }
  addNewDiscount(): void {
    this.discounts.push(this.userForm.controls.newDiscount.value!);
  }

  get skipPersonalAccountStep(): boolean {
    return (!(this.userForm.value.city || this.userForm.value.bio) &&
      this.userForm.value.accountType == 'personal') as boolean;
  }
}
