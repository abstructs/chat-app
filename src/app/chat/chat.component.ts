import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { RoomService } from '../services/room.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { SignUpDialogComponent } from '../sign-up-dialog/sign-up-dialog.component';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { ChatService, ChatMessage } from '../services/chat.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [UserService, RoomService, ChatService]
})
export class ChatComponent implements OnInit {

  messageForm: FormGroup;
  roomName: String;
  messages: String[];

  get message() {
    return this.messageForm.get('message');
  }


  constructor(public dialog: MatDialog, private userService: UserService, private roomService: RoomService, 
    private route: ActivatedRoute, private chatService: ChatService, private snackBar: MatSnackBar) { 
      this.messageForm = new FormGroup({
        message: new FormControl('', [
          Validators.required
        ])
      });

      this.roomName = this.route.snapshot.paramMap.get("room");
      
      chatService.connect(this.roomName, this.onMessage);
  }

  ngOnInit() {
    
  }

  onMessage(message: ChatMessage) {
    console.log(message);
  }

  sendMessage() {
    if(this.messageForm.valid) {
      const message = this.message.value;
      
      this.chatService.message(message);

    } else {
      this.snackBar.open("Please check the form for errors", "CLOSE");
    }

    this.setFormTouched(this.messageForm);
  }

  setFormTouched(formGroup: FormGroup): void {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.setFormTouched(control);
      }
    });
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
