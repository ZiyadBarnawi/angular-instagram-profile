import { Component } from '@angular/core';
import { TabsModule, Tab, TabList } from 'primeng/tabs';
import { Post } from '../post/post';
@Component({
  standalone: true,
  selector: 'app-posts',
  imports: [TabsModule, Post],
  templateUrl: './posts.html',
  styleUrl: './posts.css',
})
export class Posts {}
