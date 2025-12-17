import { Component, input, signal } from '@angular/core';
import { TabsModule, Tab, TabList } from 'primeng/tabs';
import { Post } from '../post/post';
import { Post as PostModel } from './../../models/post.model';
import { Images } from '../../models/images.enum';
import { User } from '../../models/user.model';
@Component({
  standalone: true,
  selector: 'app-posts',
  imports: [TabsModule, Post],
  templateUrl: './posts.html',
  styleUrl: './posts.css',
})
export class Posts {
  randomNum = signal<number>(Math.floor(Math.random() * 7));
  user = input<User>();
  updateRandomValue(): void {
    this.randomNum.set(Math.floor(Math.random() * 7) + 1);
  }
}
