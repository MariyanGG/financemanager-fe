import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/service/login/auth.service';
import { JwtToken } from '../../core/interfaces/jwt-token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginUser = this.loginForm.value;
      this.authService.login(loginUser).subscribe({
        next: (response: JwtToken) => {
          localStorage.setItem('token', response.jwt);
          this.router.navigate(['/budget']);
        },
        error: (error: any) => {
          this.loginError = 'Invalid email or password.';
        }
      });
    }
  }
}