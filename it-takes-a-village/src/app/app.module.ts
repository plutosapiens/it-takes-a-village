import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule }  from '@angular/fire/compat/auth';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment.development';

import { CatalogComponent } from './tips/catalog/catalog.component';
import { LoginComponent } from './user/login/login.component';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './user/signup/signup.component';
import { AddnewComponent } from './tips/addnew/addnew.component';
import { ArticleComponent } from './tips/article/article.component';
import { UpdateComponent } from './tips/update/update.component';

@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    LoginComponent,
    SignupComponent,
    AddnewComponent,
    ArticleComponent,
    UpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,   
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
   FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

