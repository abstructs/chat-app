import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatToolbarModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatCardModule, MatListModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LobbyComponent } from './lobby/lobby.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignUpDialogComponent } from './sign-up-dialog/sign-up-dialog.component';
import { RoomDialogComponent } from './room-dialog/room-dialog.component';
import { RoomService } from './services/room.service';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    LobbyComponent,
    LoginDialogComponent,
    SignUpDialogComponent,
    RoomDialogComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatCardModule,
    MatListModule
  ],
  providers: [UserService, CookieService, RoomService],
  bootstrap: [AppComponent],
  entryComponents: [
    LoginDialogComponent,
    SignUpDialogComponent,
    RoomDialogComponent
  ]
})
export class AppModule { }
