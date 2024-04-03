import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { CatalogComponent } from './tips/catalog/catalog.component';
import { AddnewComponent } from './tips/addnew/addnew.component';
import { ArticleComponent } from './tips/article/article.component';

const routes: Routes = [
  { path:'', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'addnew', component: AddnewComponent },
  { path: 'article', component: ArticleComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
