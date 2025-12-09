import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Circle } from '../shared/circle/circle';
import { Posts } from '../components/posts/posts';
import { ButtonModule } from 'primeng/button';
import { Navbar } from '../components/navbar/navbar';

@Component({
  selector: 'app-profile',
  imports: [Circle, ButtonModule, Posts, Navbar],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {}
