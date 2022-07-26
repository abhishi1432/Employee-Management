import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationServiceService {
  constructor(private httpClient: HttpClient) {}

  validateUser(user: any): Observable<any> {
    return this.httpClient.post('http://localhost:3000/auth/v1', user);
    // We are sending whole user object to the server for the validation
  }
  setToken(token: string): void {
    localStorage.setItem('authToken', 'brearer:' + token);
  }

  getToken(): string {
    return localStorage.getItem('authToken')!;
  }

  removeToken(): void {
    localStorage.removeItem('authToken');
  }

  // isUserAuthenticated(token: string): Promise<boolean> {
  //   return this.httpClient
  //     .post(
  //       `http://localhost:3000/auth/v1/isAuthenticated`,
  //       {},
  //       { headers: new HttpHeaders().set('Authorization', `Bearer ${token}`) }
  //     )
  //     .pipe(map((response: Response) => response['isAuthenticated']))
  //     .toPromise();
  // }
}
