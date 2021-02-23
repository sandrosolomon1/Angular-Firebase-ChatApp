import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./home.component";
import {RouterModule} from "@angular/router";
import { LeftBarComponent } from './left-bar/left-bar.component';
import { NavComponent } from './nav/nav.component';
import { RightBarComponent } from './right-bar/right-bar.component';
import { PostsComponent } from './posts/posts.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatBadgeModule} from "@angular/material/badge";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [
    HomeComponent,
    LeftBarComponent,
    NavComponent,
    RightBarComponent,
    PostsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: HomeComponent}
    ]),
    FormsModule,
    MatBadgeModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class HomeModule { }
