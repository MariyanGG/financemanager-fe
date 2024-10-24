import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/service/login/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  registerError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      passwordConfirm: ['', [Validators.required]]
    }, { validator: this.passwordsMatchValidator });
  }

  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const passwordConfirm = form.get('passwordConfirm');
    return password?.value === passwordConfirm?.value ? null : { 'mismatch': true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const registerUser = this.registerForm.value;
      this.authService.register(registerUser).subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: () => {
          this.registerError = 'Registration failed. Please try again.';
        }
      });
    }
  }
}