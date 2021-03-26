import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  authenticate(username, password) {
    const body = JSON.stringify({
      username: username,
      password: password
    });
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.httpClient.post('http://localhost:8080/api/auth/signin', body, { headers }).pipe(
      map(
        userData => {
          sessionStorage.setItem('username', username);
          sessionStorage.setItem('accessToken', userData["accessToken"]);
          return userData;
        }
      )
    );
  }


  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    sessionStorage.clear()
  }
}