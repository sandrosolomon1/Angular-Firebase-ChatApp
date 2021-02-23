import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./login.component";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RegisterComponent} from "../register/register.component";
import {ModalDirective} from "../register/modal.directive";
import {MatBadgeModule} from "@angular/material/badge";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ModalDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {path: '', component: LoginComponent}
    ]),
    ReactiveFormsModule,
    MatBadgeModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [RouterModule]
})
export class LoginModule { }
