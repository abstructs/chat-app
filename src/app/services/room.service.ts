import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { HelperService } from './helper.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface Room {
  name: String
}

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private backend: BackendService, 
    private helperService: HelperService) { }

    findAll(): Observable<Room[]> {
      return this.backend.findAllRooms().pipe(
        map(res => {
          return res['rooms'];
        }),
        catchError(() => of([]))
      )
    }

    validName(name: string): Observable<boolean> {
      return this.backend.validRoomName(name).pipe(
        map(() => false),
        catchError(() => of(true))
      );
    }

    create(name: string): Observable<boolean> {
      return this.backend.createRoom(name).pipe(
        map(res => {
          return true;
        }),
        catchError((err) => {
          return of(false);
        })
      )
    }
}
