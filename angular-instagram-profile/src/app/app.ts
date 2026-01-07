import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Profile } from './profile/profile-component/profile.component';
import { Navbar } from './components/navbar/navbar.component';
import { User } from './models/user.model';
import { Images } from './models/images.enum';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { Toast, ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, DrawerModule, Drawer, ToastModule, Toast],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('ElmerGram');
}
