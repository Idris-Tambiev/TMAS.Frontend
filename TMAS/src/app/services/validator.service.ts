import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  constructor() {}

  passwordDigitsValidator(control: FormControl): { [s: string]: boolean } {
    var reg = new RegExp('^(?=.*[0-9])');
    if (reg.test(control.value) || control.value == '') {
      return null;
    } else {
      return { digits: true };
    }
  }

  passwordUpperCaseValidator(control: FormControl): { [s: string]: boolean } {
    var reg = new RegExp('^(?=.*[A-Z])');
    if (reg.test(control.value) || control.value == '') {
      return null;
    } else {
      return { upperCase: true };
    }
  }

  passwordLowerCasevalidator(control: FormControl): { [s: string]: boolean } {
    var reg = new RegExp('^(?=.*[a-z])');
    if (reg.test(control.value) || control.value == '') {
      return null;
    } else {
      return { lowerCase: true };
    }
  }

  passwordNonAlphanumericValidator(
    control: FormControl
  ): { [s: string]: boolean } {
    var reg = new RegExp('^(?=.*[!@#$%^&_/])');
    if (reg.test(control.value) || control.value == '') {
      return null;
    } else {
      return { alphanumeric: true };
    }
  }
}
