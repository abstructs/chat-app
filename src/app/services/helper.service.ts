import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const api_url = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private cookieService: CookieService) { }

  hasToken() {
    return this.cookieService.check('token');
  }

  setToken(token: string) {
    const future = new Date();
    future.setDate(future.getDate() + 30);

    this.cookieService.set('token', token, future, '/');
    location.reload();
  }

  revokeToken() {
    this.cookieService.delete('token', '/');
    location.reload();
  }

  getToken(): string {
    return this.cookieService.get('token');
  }
}
