import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { Circle } from '../shared/circle/circle';
import { Posts } from '../components/posts/posts';
import { ButtonModule } from 'primeng/button';
import { Navbar } from '../components/navbar/navbar';

@Component({
  selector: 'app-profile',
  imports: [ButtonModule, Posts, Navbar],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  stories = signal<[{ src: string }]>([{ src: 'sunnyDay.jpg' }]);
  posts = signal<string[]>([]);
}
