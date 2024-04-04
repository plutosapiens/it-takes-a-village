import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from './logout/logout.component';
import { LoaderComponent } from './loader/loader.component';



@NgModule({
  declarations: [
    LogoutComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    LogoutComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
