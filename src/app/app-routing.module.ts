import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { AboutusComponent } from './public/aboutus/aboutus.component';
import { SignupComponent } from './public/signup/signup.component';
import { LoginComponent } from './public/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { CanactivateService } from './services/guards/canactivate.service';
import { ConnectToStreamComponent } from './user/connect-to-stream/connect-to-stream.component';
import {  WorkspaceComponent } from './user/notes/workspace.component';
import { NewnotesComponent } from './user/newnotes/newnotes.component';


const routes: Routes = [
  {path:'aboutus',component:AboutusComponent,pathMatch:'full'},
  {path:'signup',component:SignupComponent,pathMatch:'full'},
  {path:'home',component:HomeComponent,pathMatch:'full'},
  {path:'login',component:LoginComponent,pathMatch:'full'},
  {path:'dashboard',component:DashboardComponent,canActivate:[CanactivateService],children:[
    {path:'connectToStream',component:ConnectToStreamComponent,pathMatch:'full'},
    {path:'workspace',component:WorkspaceComponent,pathMatch:'full'},
    {path:'notes/:id',component:NewnotesComponent,pathMatch:'full'},
    {path:'veiwnotes/:id',component:NewnotesComponent,pathMatch:'full'},
    {path:'editnotes/:id',component:NewnotesComponent,pathMatch:'full'},
    {path:'newnotes',component:NewnotesComponent,pathMatch:'full'},
  ]},
  {path:'',component:HomeComponent,pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
