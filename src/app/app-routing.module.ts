import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {AuthGuard} from "./guard/auth.guard";

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'home', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard]},
  {path: 'login', loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
