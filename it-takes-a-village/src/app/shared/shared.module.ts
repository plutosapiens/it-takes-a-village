import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from './logout/logout.component';
import { LoaderComponent } from './loader/loader.component';
import { LikebtnComponent } from './likebtn/likebtn.component';
import { LikedbtnComponent } from './likedbtn/likedbtn.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    LogoutComponent,
    LoaderComponent,
    LikebtnComponent,
    LikedbtnComponent,
    ErrorComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    LogoutComponent,
    LoaderComponent,
    LikebtnComponent,
    LikedbtnComponent
  ]
})
export class SharedModule { }
