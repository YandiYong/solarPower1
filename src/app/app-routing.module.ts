import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
import { InputApplComponent } from './components/input-appl/input-appl.component';

const routes: Routes = [
  {path: 'login',component: LoginComponent},
  {path: 'register',component: RegisterComponent},
  {path: 'home',component: HomeComponent, canActivate:[authGuard]},
  {path:'input-appl', component: InputApplComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
