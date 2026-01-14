import { Component, inject, input, signal } from '@angular/core';

import { TabsModule } from 'primeng/tabs';

import { Post } from '../post/post.component';
import { User, UserService } from '../../components/index';
@Component({
  standalone: true,
  selector: 'app-posts',
  imports: [TabsModule, Post],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent {
  randomNum = signal<number>(Math.floor(Math.random() * 7));
  userService = inject(UserService);
  user = this.userService.user;
  updateRandomValue(): void {
    this.randomNum.set(Math.floor(Math.random() * 7) + 1);
  }
}
