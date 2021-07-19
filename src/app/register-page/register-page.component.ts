import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsService } from '../forms.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['../forms.scss'],
})
export class RegisterPageComponent implements OnInit {
  constructor(private fb: FormBuilder, private formService: FormsService) {}

  registerForm: FormGroup;

  ngOnInit(): void {
    const emailRegex = '[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}';
    const nameRegex = /^[a-zA-Z ]+$/;
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(nameRegex)]],
      username: [
        '',
        {
          validators: [Validators.required, Validators.minLength(8)],
          asyncValidators: [this.checkUsernameAvailability(8)],
        },
      ],
      email: [
        '',
        {
          validators: [Validators.required, Validators.pattern(emailRegex)],
          asyncValidators: [this.checkEmailAvailability()],
        },
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get name() {
    return this.registerForm.get('name');
  }

  get username() {
    return this.registerForm.get('username');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get repassword() {
    return this.registerForm.get('repassword');
  }

  checkEmailAvailability() {
    return this.formService.checkEmailAvailability('register');
  }

  checkUsernameAvailability(minlength: number) {
    return this.formService.checkUsernameAvailability(minlength);
  }

  comparePasswords(password: string) {
    return this.formService.comparePasswords(password);
  }

  registerFormSubmit() {
    this.registerForm.markAllAsTouched();

    if (this.registerForm.valid) {
      console.log('valid');
    } else {
      console.log('invalid');
    }
  }
}
