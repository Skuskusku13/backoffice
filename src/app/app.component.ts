import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import {AuthGuard} from './core/guards/auth.guard';
import {LoginService} from './core/services/login.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    { provide: 'AuthGuard', useValue: AuthGuard  }
  ]
})

export class AppComponent implements OnInit {
  title = 'bo';
  private loginService = inject(LoginService);

  ngOnInit() {
    // Vérifier si l'utilisateur était connecté
    const accessToken = localStorage.getItem('access');
    const refreshToken = localStorage.getItem('refresh');

    if (refreshToken && accessToken) {
      console.log("access")
      this.loginService.loggedIn.next(true);
    } else {
      this.loginService.loggedIn.next(false);
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
    }
  }
}
