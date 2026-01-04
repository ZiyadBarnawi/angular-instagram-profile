import { Component, input, signal } from '@angular/core';
import { Post as PostModel } from '../../models/post.model';
@Component({
  selector: 'app-post',
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {
  post = input<PostModel>();
  //The rest is for styling
  isHover = false;
  fade = signal<string>('fade');
  onMouseover(): void {
    console.log('mouse in');

    this.fade.set('');
  }
  onMouseout(): void {
    console.log('mouse out');
    this.fade.set('fade');
  }
}
