import { Component, input, signal } from '@angular/core';
import { TabsModule, Tab, TabList } from 'primeng/tabs';
import { PostComponent } from '../post/post.component';
import { User } from '../../models/user.model';
@Component({
  standalone: true,
  selector: 'app-posts',
  imports: [TabsModule, PostComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent {
  randomNum = signal<number>(Math.floor(Math.random() * 7));
  user = input<User>();
  updateRandomValue(): void {
    this.randomNum.set(Math.floor(Math.random() * 7) + 1);
  }
}
