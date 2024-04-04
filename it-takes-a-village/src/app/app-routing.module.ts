import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { CatalogComponent } from './tips/catalog/catalog.component';
import { AddnewComponent } from './tips/addnew/addnew.component';
import { ArticleComponent } from './tips/article/article.component';
import { UpdateComponent } from './tips/update/update.component';
import { DeleteComponent } from './tips/delete/delete.component';
import { FourofourComponent } from './core/fourofour/fourofour.component';
import { LogoutComponent } from './shared/logout/logout.component';

const routes: Routes = [
  { path:'', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'addnew', component: AddnewComponent },
  { path: 'article/:id', component: ArticleComponent },
  { path: 'update/:id', component: UpdateComponent },
  { path: 'delete/:id', component: DeleteComponent },
  { path: '404', component: FourofourComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
