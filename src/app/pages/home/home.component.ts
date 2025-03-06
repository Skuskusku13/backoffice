import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-home',
  imports: [MatSlideToggleModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
