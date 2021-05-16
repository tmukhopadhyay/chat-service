import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChatComponent, SignInComponent } from './components';
import { LoggedInGuard } from './guards';

const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'chat', component: ChatComponent, canActivate: [LoggedInGuard] },
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: '**', redirectTo: '/sign-in', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
