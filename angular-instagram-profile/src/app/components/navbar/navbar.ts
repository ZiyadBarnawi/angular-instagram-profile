import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, output, signal } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { Circle } from '../../shared/circle/circle';
import { Button } from 'primeng/button';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { AutoCompleteModule, AutoComplete } from 'primeng/autocomplete';
import { Images } from '../../models/images.enum';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/user.model';
import { Users } from '../../Data/users';
import { Http } from '../../services/http';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RippleModule } from 'primeng/ripple';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MenuModule,
    Drawer,
    DrawerModule,
    AutoComplete,
    AutoCompleteModule,
    RippleModule,
    RouterLink,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  user = output<User>();
  http = inject(Http);
  visible = false;
  formControl = new FormControl();
  users: User[] = [];
  suggestedUsers: User[] = [{ username: '', pfp_url: Images[1] }];
  routerUsername = signal<string>('');
  menuItems: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      command: (): void => {},
      routerLink: '/',
    },
    {
      label: 'Search',
      icon: 'pi pi-search',
      command: (): void => {
        this.visible = !this.visible;
      },
    },
    {
      label: 'Explore',
      icon: 'pi pi-compass',
      command: (): void => {},
      routerLink: 'explore',
    },
    {
      label: 'Reels',
      icon: 'pi pi-video',
      command: (): void => {},
      routerLink: 'Reels',
    },
    {
      label: 'Messages',
      icon: 'pi pi-file',
      command: (): void => {},
      routerLink: 'Messages',
    },
    {
      label: 'Post',
      icon: 'pi pi-send',
      command: (): void => {},
      routerLink: 'Posts',
    },
    {
      label: 'Profile',
      icon: 'pi pi-user',
      command: (): void => {},
      routerLink: this.routerUsername(),
    },
  ];
  async onSearch(searchWord: any): Promise<void> {
    if (environment.production) {
      let users = (await this.http.getUsers()) as Observable<Object>;
      users
        .pipe(
          catchError((err) => {
            console.log(err);

            throw err;
          })
        )
        .subscribe((data: any) => {
          this.suggestedUsers = data.data.filter((user: any) =>
            user.username.toLowerCase().includes(searchWord.query?.toLowerCase())
          ) as User[];
        });
    } else {
      this.users = (await this.http.getUsers()) as User[];
      this.suggestedUsers = this.users.filter((user) =>
        user.username.toLowerCase().includes(searchWord.query?.toLowerCase())
      ) as User[];
    }
  }

  async onUserClick(user: User): Promise<void> {
    let data = await this.http.getUsers(user.username);
    // console.log();

    if (environment.production) {
      data = data as Observable<Object>;
      data
        .pipe(
          catchError((err) => {
            throw err;
          })
        )
        .subscribe((data: any) => {
          this.user.emit(data.data[0]);
          this.routerUsername.set(data.data[0].username);
        });
    } else {
      data = data as User;

      this.user.emit(data as User);
      this.routerUsername.set(data.username);
    }
  }
}
