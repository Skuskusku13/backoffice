import {Component, inject, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {Router, RouterLinkActive, RouterModule} from '@angular/router';
import {LoginService} from '../../core/services/login.service';

/**
 * @title Footer component
 */
@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatListModule,
    RouterLinkActive,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
 })
export class HeaderComponent implements OnInit {

  loginService: LoginService = inject(LoginService);
  router: Router = inject(Router);
  loggedIn!: boolean;

  navBarItems = [
    { name: 'BackOffice TIG', segment: 'home' },
    { name: 'Products', segment: 'products' },
    { name: 'Business', segment: 'business' }
  ];

  ngOnInit(): void {
    this.loginService.isLoggedIn.subscribe((value: boolean) => {
      console.log(value)
      this.loggedIn = value
    })
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

}
