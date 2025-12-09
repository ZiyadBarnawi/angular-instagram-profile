import { Component, input } from '@angular/core';

@Component({
  selector: 'app-circle',
  imports: [],
  templateUrl: './circle.html',
  styleUrl: './circle.css',
})
export class Circle {
  src = input<string>('angular-instagram-pfppublicsunnyDay.jpg');
}
