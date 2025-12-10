import { Component, signal } from '@angular/core';
import { TabsModule, Tab, TabList } from 'primeng/tabs';
import { Post } from '../post/post';
import { Post as PostModel } from './../../models/post.model';
import { Images } from '../../models/images.enum';
@Component({
  standalone: true,
  selector: 'app-posts',
  imports: [TabsModule, Post],
  templateUrl: './posts.html',
  styleUrl: './posts.css',
})
export class Posts {
  updateRandomValue(): void {
    this.randomNum.set(Math.floor(Math.random() * 10) + 1);
  }
  randomNum = signal<number>(Math.floor(Math.random() * 7));

  posts = signal<PostModel[]>([
    { imgSrc: Images[Math.floor(Math.random() * 5)], likesCount: 13 },
    { imgSrc: Images[Math.floor(Math.random() * 5)], likesCount: 13 },
    { imgSrc: Images[Math.floor(Math.random() * 5)], likesCount: 13 },
    { imgSrc: Images[Math.floor(Math.random() * 5)], likesCount: 13 },
    { imgSrc: Images[Math.floor(Math.random() * 5)], likesCount: 13 },
    { imgSrc: Images[Math.floor(Math.random() * 5)], likesCount: 13 },
    { imgSrc: Images[Math.floor(Math.random() * 5)], likesCount: 13 },
    { imgSrc: Images[Math.floor(Math.random() * 5)], likesCount: 13 },
    { imgSrc: Images[Math.floor(Math.random() * 5)], likesCount: 13 },
    { imgSrc: Images[Math.floor(Math.random() * 5)], likesCount: 13 },
    { imgSrc: Images[Math.floor(Math.random() * 5)], likesCount: 13 },
  ]);
}
