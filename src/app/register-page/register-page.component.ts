import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsService } from '../forms.service';
import { Router } from '@angular/router';

@Component({
  selector: 'si-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['../forms.scss'],
})
export class RegisterPageComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private formsService: FormsService,
    private router: Router
  ) {}

  registerForm: FormGroup;

  async ngOnInit() {
    const emailRegex = '[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}';
    const nameRegex = /^[a-zA-Z ]+$/;
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(nameRegex)]],
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

  get form() {
    return this.registerForm;
  }

  get name() {
    return this.registerForm.get('name');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  checkEmailAvailability() {
    return this.formsService.checkEmailAvailability('register');
  }

  async registerFormSubmit() {
    this.registerForm.markAllAsTouched();

    if (this.registerForm.valid) {
      const result = await this.formsService.register(this.registerForm.value);
      if (result == '') {
        this.router.navigate(['']);
      } else {
        console.error(result);
      }
    }
  }
}
