import { inject, Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Users } from '../Data/users';

@Injectable({
  providedIn: 'root',
})
export class Http {
  http = inject(HttpClient);
  async getUsers(username?: number) {
    const users = this.http.get(
      `http://192.168.7.58:8080/api/v1/users${username ? `/${username}` : ''}`,
      {
        headers: { 'ngrok-skip-browser-warning': 'true' },
        timeout: 2000,
      }
    );

    // this.http
    //   .get('http://192.168.7.58:8080/api/v1/users', {
    //     headers: { 'ngrok-skip-browser-warning': 'true' },
    //   })
    //   .subscribe({
    //     next: (data) => console.log(data),
    //     error: (err) => console.error(err),
    //   });

    return users;
  }
}
