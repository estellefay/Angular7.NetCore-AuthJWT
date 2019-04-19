import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';

const routes: Routes = [
  // Si aucune route on se redirige vers celle ci 
  {path:'',redirectTo:'/user/registration',pathMatch:'full'},
  {
    //Route user 
    path: 'user', component: UserComponent,
    children: [
      // Route enfant de user, donct /user/registration
      { path: 'registration', component: RegistrationComponent },
      { path: 'login', component: LoginComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
