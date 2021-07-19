import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsService } from '../forms.service';

@Component({
  selector: 'et-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['../forms.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(private fb: FormBuilder, private formService: FormsService) {}

  loginForm: FormGroup;

  ngOnInit(): void {
    const emailRegex = '[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}';
    this.loginForm = this.fb.group({
      email: [
        '',
        {
          validators: [Validators.required, Validators.pattern(emailRegex)],
          asyncValidators: [this.checkEmailAvailability()],
        },
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  checkEmailAvailability() {
    return this.formService.checkEmailAvailability('login');
  }

  loginFormSubmit() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      console.log('valid');
    } else {
      console.log('invalid');
    }
  }
}
