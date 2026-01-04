import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, output, signal } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { AutoCompleteModule, AutoComplete } from 'primeng/autocomplete';
import { Images } from '../../models/images.enum';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/user.model';
import { Http } from '../../services/http.service';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RippleModule } from 'primeng/ripple';
import { RouterLink } from '@angular/router';
import { InputGroup, InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddon, InputGroupAddonModule } from 'primeng/inputgroupaddon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MenuModule,
    Drawer,
    DrawerModule,
    InputGroupAddonModule,
    AutoComplete,
    AutoCompleteModule,
    InputGroupModule,
    RippleModule,
    RouterLink,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  user = output<User>();
  http = inject(Http);
  visible = false;
  formControl = new FormControl();
  users: User[] = [];
  suggestedUsers: User[] = [{ username: '', pfpUrl: Images[1], password: '123456' }];
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
      routerLink: `profile/${this.routerUsername()}`,
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
      this.suggestedUsers = this.users?.filter((user) =>
        user.username?.toLowerCase()?.includes(searchWord.query?.toLowerCase())
      ) as User[];
    }
  }

  async onUserClick(user: User): Promise<void> {
    let data = await this.http.getUsers(user.username);

    if (environment.production) {
      data = data as Observable<Object>;
      data
        .pipe(
          catchError((err) => {
            throw err;
          })
        )
        .subscribe((data: any) => {
          this.user.emit(data.data);
          this.routerUsername.set(data.data.username);
        });
    } else {
      data = data as User;

      this.user.emit(data as User);
      this.routerUsername.set(data.username);
    }
  }
}
