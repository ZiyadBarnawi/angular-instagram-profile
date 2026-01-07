import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

export interface Form {
  username: FormControl<string>;
  phoneNumber: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
  pfpUrl: FormControl<string>;
  bio: FormControl<string>;
  dateOfBirth: FormControl<string | null>;
  gender: FormControl<'M' | 'F'>;
  city: FormControl<string>;
  commercialPaper: FormControl<string>;
  commercialRegistryNumber: FormControl<string>;
  iban: FormControl<string>;
  accountType: FormControl<'personal' | 'business'>;
  paymentMethods: FormControl<string[]>;
  newCategory: FormControl<string>; // This is used to handle the new category
  newDiscount: FormControl<string>; // This is used to handle the new discount
  products: FormArray<
    FormGroup<{
      name: FormControl<string>;
      price: FormControl<string>;

      categories: FormControl<string>;
      discounts: FormControl<string[]>;
    }>
  >;
  workHours: FormArray<
    FormGroup<{
      day: FormControl<string>;
      available: FormControl<boolean>;
      flexible: FormControl<boolean>;
      openHours: FormControl;
      closeHours: FormControl;
    }>
  >;
}
