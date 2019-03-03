import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { RoomService } from '../services/room.service';
import { MatDialog } from '@angular/material';
import { SignUpDialogComponent } from '../sign-up-dialog/sign-up-dialog.component';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [UserService, RoomService, ChatService]
})
export class ChatComponent implements OnInit {

  roomName: String;

  constructor(public dialog: MatDialog, private userService: UserService, private roomService: RoomService, 
    private route: ActivatedRoute, private chatService: ChatService) { 
      this.roomName = this.route.snapshot.paramMap.get("room");
      
      chatService.connect(this.roomName, "drew");
  }

  ngOnInit() {
    
  }

  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

  onLoginClick() {
    this.openLoginDialog();
  }

  onSignUpClick() {
    this.openSignUpDialog();
  }

  openSignUpDialog(): void {
    const dialogRef = this.dialog.open(SignUpDialogComponent, {
      width: "60%"
    });
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: "60%"
    });
  }

  onLogoutClick(): void {
    this.userService.logout();
  }
}
