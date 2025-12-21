import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Profile } from './profile/profile';
import { Navbar } from './components/navbar/navbar';
import { User } from './models/user.model';
import { Images } from './models/images.enum';
import { Drawer, DrawerModule } from 'primeng/drawer';

@Component({
  selector: 'app-root',
  imports: [Profile, RouterOutlet, Navbar, DrawerModule, Drawer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('ElmerGram');
  user = signal<User>({ username: 'Default', pfp_url: Images[2], bio: 'Default' });
  onUserChange(user: any): void {
    // this.user.set(user);
  }
}
