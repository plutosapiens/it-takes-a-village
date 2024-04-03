import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from './logout/logout.component';
import { ImageuploadComponent } from './imageupload/imageupload.component';



@NgModule({
  declarations: [
    LogoutComponent,
    ImageuploadComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    LogoutComponent,
  ]
})
export class SharedModule { }
