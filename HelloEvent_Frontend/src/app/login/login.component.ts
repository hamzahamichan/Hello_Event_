import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  handleLogin(): void {
    if (this.formLogin.invalid) {
      return;
    }

    const { email, password } = this.formLogin.value;

    this.authService.login(email, password).subscribe({
      next: data => {
        console.log('API Response:', data);  // Ajoutez ce journal pour vérifier la réponse
        this.authService.loadProfile(data);
        this.router.navigateByUrl("/admin");
      },
      error: err => {
        console.error('Login error:', err);
      }
    });
  }
}
