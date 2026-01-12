import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Drawer, DrawerModule } from 'primeng/drawer';
import { Toast, ToastModule } from 'primeng/toast';

import { Navbar } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, DrawerModule, Drawer, ToastModule, Toast],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('ElmerGram');
}
