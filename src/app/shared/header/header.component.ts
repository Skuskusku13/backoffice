import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLinkActive, RouterModule } from '@angular/router';

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
export class HeaderComponent {
  navBarItems = [
    { name: 'BackOffice TIG', segment: 'home' },
    { name: 'Products', segment: 'products' },
    { name: 'Business', segment: 'business' },
  ];
}
