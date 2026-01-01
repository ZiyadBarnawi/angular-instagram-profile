import { inject, Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Users } from '../data/users';
import { environment } from '../../environments/environment';
import { catchError, Observable } from 'rxjs';
import { Images } from '../models/images.enum';
import { FormGroup } from '@angular/forms';
import { user } from '../data/dummyUser';

@Injectable({
  providedIn: 'root',
})
export class Http {
  http = inject(HttpClient);
  GetJsonUser(): Observable<Object> {
    return this.http.get('data/user.json');
  }
  async getUsers(
    username?: string
  ): Promise<Observable<Object> | Promise<User[]> | Promise<User> | null> {
    // Spring environment
    if (environment?.production) {
      return this.http.get(`${environment?.apiUrl}/api/v1/users${username ? `/${username}` : ''}`, {
        headers: { 'ngrok-skip-browser-warning': 'true' },
        timeout: 20000,
      });
    }
    //Local environment
    else {
      if (username)
        return (JSON.parse(localStorage.getItem('users') as string) as User[]).find(
          (user) => user.username === username
        ) as User;

      return JSON.parse(localStorage.getItem('users') as string) as User[];
    }
  }
  async register(form: FormGroup): Promise<void> {
    let usersString = localStorage.getItem('users') as string;

    let users: User[] = JSON.parse(usersString) as User[];
    if (users) {
      users.push(form.value as User);
      localStorage.setItem(`users`, JSON.stringify(users));
    }
    //first user
    else {
      localStorage.setItem('users', JSON.stringify([form.value]));
    }
    // if (environment.production) {
    //   this.http
    //     .post(`${environment?.apiUrl}/api/v1/users`, user)
    //     .pipe(
    //       catchError((err) => {
    //         throw err;
    //       })
    //     )
    //     .subscribe((data) => {});
    // } else {
    //   let users: any = localStorage.getItem('users');
    //   if (users) {
    //     users = JSON.parse(users);
    //     users.push(user);
    //     localStorage.setItem(`users`, JSON.stringify(users));
    //   }
    //   //First user in localStorage
    //   else {
    //     localStorage.setItem(
    //       'users',
    //       JSON.stringify([
    //         {
    //           username: user.username,
    //           password: user.password,
    //           pfpUrl: Images[Math.floor(Math.random() * 5)],
    //         } as User,
    //       ])
    //     );
    //   }
    // }
  }
  async editUser(username: string, newUser: User): Promise<User | Observable<Object> | null> {
    if (environment.production) {
      return this.http
        .patch(`${environment.apiUrl}/api/v1/users/${newUser.username}`, newUser)
        .pipe(
          catchError((err) => {
            throw err;
          })
        );
    } else {
      let users = localStorage.getItem('users')
        ? (JSON.parse(localStorage.getItem('users') as string) as User[])
        : null;

      if (!users) return null;
      let oldUserIndex = users.findIndex((user) => user.username === username);
      if (oldUserIndex < 0) return null;
      users[oldUserIndex] = newUser;
      localStorage.setItem('users', JSON.stringify(users));

      return users[oldUserIndex];
    }
  }
  async deleteUser(username: string): Promise<void> {
    if (environment.production) {
      this.http.delete(`${environment.apiUrl}/api/v1/users/${username}`).subscribe((data) => {});
    } else {
      let users = JSON.parse(localStorage.getItem('users') as string) as User[];

      const deletedUserIndex = users.findIndex((user) => user.username === username);
      users.splice(deletedUserIndex, 1);
      localStorage.setItem('users', JSON.stringify(users));
    }
  }
}
