import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { HelperService } from './helper.service';

import * as io from 'socket.io-client';
import { map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

export enum MessageType {
  join, disconnect, message
}

export interface ChatMessage {
  username: String;
  message: String;
  type: MessageType;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  socket: SocketIOClient.Socket;

  constructor(private backend: BackendService, 
    private helperService: HelperService) { }

  connect(room: String, onMessage: (message: ChatMessage) => void) {
    const token = this.helperService.getToken();

    this.socket = io.connect({ query: { token, room }, forceNew: true });

    this.socket.on('join', (data) => {
      const message: ChatMessage = data;

      message.type = MessageType.join;

      onMessage(message);
    });

    this.socket.on('left', (data) => {
      const message: ChatMessage = data;

      if(typeof(message) != 'string') {
        message.type = MessageType.disconnect;

        onMessage(message);
      }
    });

    this.socket.on('message', (data) => {
      const message: ChatMessage = data;

      message.type = MessageType.message;

      onMessage(message);
    });
  }

  message(message) {
    this.socket.emit('message', { message });
  }

  viewConnected(roomName): Observable<String[]> {
    return this.backend.getConnected(roomName).pipe(
      map(res => {
        const usernames = res['usernames'];
        
        return usernames;
      }),
      catchError(err => {
        return of([]);
      })
    );
  }
}
