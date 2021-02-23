import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {MatCardModule} from "@angular/material/card";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ]
})
export class SharedModule { }
