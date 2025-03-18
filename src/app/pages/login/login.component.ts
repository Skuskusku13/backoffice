import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../../core/services/login.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hidePassword = true;
  loggedIn!: boolean;
  loginService: LoginService = inject(LoginService);
  router: Router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.loginService.isLoggedIn.subscribe({
      next: (isLoggedIn: boolean) => {
        this.loggedIn = isLoggedIn
      },
      error: err => console.log(err)
    })
  }

  login() {
    if (this.loginForm.valid) {
      this.loginService.login({
        username: this.loginForm.get('username')?.value.trim(),
        password: this.loginForm.get('password')?.value.trim()
      }).subscribe({
        next: () => {
          this.loginService.loggedIn.next(true);
          this.router.navigate(['/products']);
        },
        error: (error) => {
          console.error('Login failed:', error);
        }
      });
    }
  }
}
