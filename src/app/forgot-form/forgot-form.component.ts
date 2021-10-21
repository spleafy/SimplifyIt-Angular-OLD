import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { responseMessage } from '../app.component';
import { FormsService } from '../forms.service';

@Component({
  selector: 'si-forgot-form',
  templateUrl: './forgot-form.component.html',
  styleUrls: ['../forms.scss'],
})
export class ForgotFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private formsService: FormsService,
    private router: Router
  ) {}

  forgotForm: FormGroup;

  ngOnInit(): void {
    const emailRegex = '[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}';
    this.forgotForm = this.fb.group({
      email: [
        '',
        {
          validators: [Validators.required, Validators.pattern(emailRegex)],
          asyncValidators: [this.checkEmailAvailability()],
        },
      ],
    });
  }

  get email() {
    return this.forgotForm.get('email');
  }

  checkEmailAvailability() {
    return this.formsService.checkEmailAvailability('login');
  }

  // Form Submit Function

  async forgotFormSubmit() {
    // Marking All Inputs As Touched So Errors Will Show
    this.forgotForm.markAllAsTouched();
    // Checking If Login Was Successfull Only If The Form Is Valid
    if (this.forgotForm.valid) {
      const result: responseMessage = await this.formsService.sendEmail(
        this.forgotForm.value
      );

      if (!result.data.successfull) {
        this.forgotForm
          .get('password')
          .setErrors({ passwordInvalidForEmail: true });
      } else {
        this.router.navigate(['']);
      }
    }
  }
}
