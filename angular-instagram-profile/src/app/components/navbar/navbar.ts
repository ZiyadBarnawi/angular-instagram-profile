import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { Circle } from '../../shared/circle/circle';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenuModule, Circle],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  menuItems: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-home',
    },
    {
      label: 'Search',
      icon: 'pi pi-search',
    },
    {
      label: 'Explore',
      icon: 'pi pi-compass',
    },
    {
      label: 'Reels',
      icon: 'pi pi-video',
    },
    {
      label: 'Messages',
      icon: 'pi pi-file',
    },
    {
      label: 'Post',
      icon: 'pi pi-send',
    },
    {
      label: 'Profile',
      icon: 'pi pi-user',
    },
  ];
}
