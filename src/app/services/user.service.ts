import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { HelperService } from './helper.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private backend: BackendService, 
    private helperService: HelperService) { }

  isLoggedIn(): boolean {
    return this.helperService.hasToken();
  }

  logout(): void {
    this.helperService.revokeToken();
  }

  authenticate(username: string, password: string): Observable<boolean> {
    return this.backend.authenticate(username, password).pipe(
      map(res => {
        const { token } = res['auth'];

        this.helperService.setToken(token);
        return true;
      }),
      catchError((err) => {
        this.helperService.revokeToken();
        return of(false);
      })
    )
  }

  create(username: string, password: string): Observable<boolean> {
    return this.backend.createUser(username, password).pipe(
      map(res => {
        const { token } = res['auth'];

        this.helperService.setToken(token);
        return true;
      }),
      catchError((err) => {
        this.helperService.revokeToken();
        return of(false);
      })
    )
  }

  usernameTaken(username: string):Observable<boolean> {
    return this.backend.validUsername(username).pipe(
      map(() => false),
      catchError(() => of(true))
    );
  }
}
