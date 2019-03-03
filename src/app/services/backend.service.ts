import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HelperService } from './helper.service';
import { HttpHeaders } from '@angular/common/http';
import { api_url } from './helper.service';

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

  // room 

  validRoomName(name: string): Observable<Object> {
    return this.http.post(`${this.api_url}/room/valid-name`, {
      room: {
        name
      }
    }, this.httpOptions);
  }

  findAllRooms(): Observable<Object> {
    return this.http.get(`${this.api_url}/room`, this.httpOptions);
  }

  createRoom(name: string): Observable<Object> {
    return this.http.post(`${this.api_url}/room`, {
      room: {
        name
      }
    }, this.httpOptions);
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
