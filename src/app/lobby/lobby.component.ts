import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { MatDialog } from '@angular/material';
import { SignUpDialogComponent } from '../sign-up-dialog/sign-up-dialog.component';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
  providers: [UserService]
})
export class LobbyComponent implements OnInit {

  constructor(public dialog: MatDialog, private userService: UserService) { }

  ngOnInit() {
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

  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

  onLogoutClick(): void {
    this.userService.logout();
  }

  openCreateRoomDialog() {
    console.log("hi");
  }

}
