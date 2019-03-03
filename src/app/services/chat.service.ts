import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { HelperService } from './helper.service';

import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private backend: BackendService, 
    private helperService: HelperService) { }

  connect(room, username) {
    const socket = io.connect(`http://localhost:3100`, { query: { username, room }});

    console.log('connect called');

    socket.on('somone joined', (data) => {
      console.log(data);
      console.log('someone joined');
    });

    socket.on('someone left', (data) => {
      console.log(data);
      console.log('someone left');
    });
  }
}
