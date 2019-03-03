import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LobbyComponent } from './lobby/lobby.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [{
  path: '', component: LobbyComponent,
}, {
  path: 'chat/:room', component: ChatComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
