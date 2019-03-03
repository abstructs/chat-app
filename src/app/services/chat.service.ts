import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { HelperService } from './helper.service';

import * as io from 'socket.io-client';
import { UserService } from './user.service';

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

  connect(room, onMessage: (message: ChatMessage) => void) {
    const token = this.helperService.getToken();

    this.socket = io.connect(`http://localhost:3100`, { query: { token, room }});

    this.socket.on('join', (data) => {
      const message: ChatMessage = data;

      onMessage(message);
    });

    this.socket.on('disconnect', (data) => {
      const message: ChatMessage = data;

      onMessage(message);
    });

    this.socket.on('message', (data) => {
      const message: ChatMessage = data;

      onMessage(message);
    })
  }

  message(message) {
    this.socket.emit('message', { message });
  }
}
