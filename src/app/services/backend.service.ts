import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HelperService } from './helper.service';
import { HttpHeaders } from '@angular/common/http';
import { api_url } from './helper.service';

// import { Game } from './game.service';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  api_url: string;
  httpOptions: { headers: HttpHeaders };

  constructor(private http: HttpClient, private helperService: HelperService) { 
    this.api_url = api_url;
    
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${this.helperService.getToken()}`
      })
    }
  }

  // user

  authenticate(username: string, password: string): Observable<Object> {
    return this.http.post(`${this.api_url}/user/login`, {
      user: {
        username,
        password
      }
    });
  }

  createUser(username: string, password: string): Observable<Object> {
    return this.http.post(`${this.api_url}/user/signup`, {
      user: {
        username,
        password
      }
    });
  }

  validUsername(username: string): Observable<Object> {
    return this.http.post(`${this.api_url}/user/valid-username`, {
      user: {
        username
      }
    });
  }
}
