import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { User } from './user.model';

@Injectable()
export class UserService {
  baseUrl: string = 'http://localhost:3000/users';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  getUserById(id: any): Observable<User> {
    return this.http.get<User>(this.baseUrl + '/' + id);
  }

  saveUser(user: any): Observable<User> {
    return this.http.post<User>(this.baseUrl, user);
  }

  updateUser(user: User, id: any): Observable<User>{
    return this.http.put<User>(this.baseUrl + '/' + id, user).pipe(
      map(() => user),
      catchError(this.handleError)
    );
  }

  deleteUserById(id: any): Observable<User> {
    return this.http.delete<User>(this.baseUrl + '/' + id);
  }

  private handleError(error: any) {
    console.log(error);
    return throwError(error);
  }
}
