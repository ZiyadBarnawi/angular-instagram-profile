import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { User } from './models/user.model';
import { Images } from './models/images.enum';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { Toast, ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, DrawerModule, Drawer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('ElmerGram');
  user = signal<User>({
    username: 'Default',
    pfpUrl: Images[2],
    bio: 'Default',
    password: '123456',
  });
  onUserChange(user: User): void {
    // this.user.set(user);
  }
}
