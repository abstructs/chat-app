import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { MatDialog } from '@angular/material';
import { SignUpDialogComponent } from '../sign-up-dialog/sign-up-dialog.component';
import { RoomDialogComponent } from '../room-dialog/room-dialog.component';
import { RoomService, Room } from '../services/room.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
  providers: [UserService, RoomService]
})
export class LobbyComponent implements OnInit {

  constructor(public dialog: MatDialog, private userService: UserService, private roomService: RoomService) { 
    this.getRooms();
  }
  
  ngOnInit() {
  }

  rooms: Room[];

  getRooms() {
    this.roomService.findAll().subscribe((rooms: Room[]) => {
      this.rooms = rooms;
    });
  }

  onJoinClick(roomName) {
    
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

  openCreateRoomDialog() {
    const dialogRef = this.dialog.open(RoomDialogComponent, {
      width: "60%"
    });
  }

  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

  onLogoutClick(): void {
    this.userService.logout();
  }
}
