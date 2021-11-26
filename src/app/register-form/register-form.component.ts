import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../form.service';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { responseMessage } from '../app.component';

@Component({
  selector: 'si-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['../forms.scss'],
})
export class RegisterFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private accountService: AccountService,
    private router: Router
  ) {}

  registerForm: FormGroup;

  async ngOnInit() {
    const emailRegex = '[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}';
    const nameRegex = /^[a-zA-Z ]+$/;
    const usernameRegex = '^[a-zA-Z0-9_]*$';
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(nameRegex)]],
      username: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(16),
            Validators.pattern(usernameRegex),
          ],
          asyncValidators: [this.checkUsernameAvailability()],
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
      repassword: [
        '',
        {
          validators: [Validators.required, Validators.minLength(8)],
        },
      ],
    });
  }

  get form() {
    return this.registerForm;
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
    return this.accountService.checkEmailAvailability('register');
  }

  checkUsernameAvailability() {
    return this.accountService.checkUsernameAvailability();
  }

  async registerFormSubmit() {
    // Marking All Inputs As Touched
    this.registerForm.markAllAsTouched();

    if (this.registerForm.valid) {
      // If The Form Is Valid, Send The Register Request
      const result: responseMessage = await this.formService.register(
        this.registerForm.value
      );
      if (result.data.successful) {
        // If The Register Was successful, Then Set The Token To The Local Storage
        localStorage.setItem('token', result.data.token);

        // Set The User In The State Store
        await this.accountService.setUserState();

        // Navigate To The Root Component
        this.router.navigate(['']);
      } else {
        console.error(result);
      }
    }
  }
}
