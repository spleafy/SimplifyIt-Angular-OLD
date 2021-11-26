import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../form.service';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { responseMessage } from '../app.component';

@Component({
  selector: 'si-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['../forms.scss'],
})
export class LoginFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private accountService: AccountService,
    private router: Router
  ) {}

  loginForm: FormGroup;

  async ngOnInit() {
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

  // Getter Functions For Easier Accessibility Throughout The Template

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  checkEmailAvailability() {
    return this.accountService.checkEmailAvailability('login');
  }

  // Form Submit Function

  async loginFormSubmit() {
    // Marking All Inputs As Touched So Errors Will Show
    this.loginForm.markAllAsTouched();
    // Checking If Login Was successful Only If The Form Is Valid
    if (this.loginForm.valid) {
      const result: responseMessage = await this.formService.login(
        this.loginForm.value
      );

      if (!result.data.successful) {
        // If The Login Is Not successful, Set Form Field Error
        this.loginForm
          .get('password')
          .setErrors({ passwordInvalidForEmail: true });
      } else {
        // If The Login Is successful, Set The Token To The Local Storage
        localStorage.setItem('token', result.data.token);

        // Set The User In The State Store
        await this.accountService.setUserState();

        // Navigate To The Root Page
        this.router.navigate(['']);
      }
    }
  }
}
