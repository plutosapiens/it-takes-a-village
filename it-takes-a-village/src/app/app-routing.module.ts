import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';

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
import { FavouritesComponent } from './user/favourites/favourites.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'addnew', component: AddnewComponent, canActivate: [AuthGuard] },
  { path: 'article/:id', component: ArticleComponent, canActivate: [AuthGuard] },
  { path: 'update/:id', component: UpdateComponent, canActivate: [AuthGuard] },
  { path: 'delete/:id', component: DeleteComponent, canActivate: [AuthGuard] },
  { path: '404', component: FourofourComponent },
  { path: '**', component: FourofourComponent },
  { path: 'favourites', component: FavouritesComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
