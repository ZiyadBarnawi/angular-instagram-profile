import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, output } from '@angular/core';
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
import { catchError } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenuModule, Drawer, DrawerModule, AutoComplete, AutoCompleteModule],
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

  menuItems: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      command: (): void => {},
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
    },
    {
      label: 'Reels',
      icon: 'pi pi-video',
      command: (): void => {},
    },
    {
      label: 'Messages',
      icon: 'pi pi-file',
      command: (): void => {},
    },
    {
      label: 'Post',
      icon: 'pi pi-send',
      command: (): void => {},
    },
    {
      label: 'Profile',
      icon: 'pi pi-user',
      command: (): void => {},
    },
  ];
  async onSearch(searchWord: any): Promise<void> {
    //! When the backend is down
    // let users = Users;
    // console.log(users);

    // this.suggestedUsers = users.filter((user) =>
    //   user.username.toLowerCase().includes(searchWord.query?.toLowerCase())
    // ) as User[];
    //! When the backend is up
    (await this.http.getUsers(1)).subscribe((data) => {
      console.log(data);
    });
    let users = await this.http.getUsers();
    users
      .pipe(
        catchError((err) => {
          console.log(err);

          throw err;
        })
      )
      .subscribe((data: any) => {
        console.log(data);

        this.suggestedUsers = data.data.filter((user: any) =>
          user.username.toLowerCase().includes(searchWord.query?.toLowerCase())
        ) as User[];
      });
    this.suggestedUsers = this.users.filter((user) =>
      user.username.toLowerCase().includes(searchWord.query?.toLowerCase())
    ) as User[];
  }
  onUserClick(user: any): void {
    this.user.emit(user);
  }
}
