import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './public/widgets/header/header.component';
import { HomeComponent } from './public/home/home.component';
import { AboutusComponent } from './public/aboutus/aboutus.component';
import { SignupComponent } from './public/signup/signup.component';
import { SpinnersComponent } from './public/widgets/spinners/spinners.component';
import { MenuComponent } from './public/widgets/menu/menu.component';
import { LoginComponent } from './public/login/login.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { ConnectToStreamComponent } from './user/connect-to-stream/connect-to-stream.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NewnotesComponent } from './user/newnotes/newnotes.component';
import { BooleanSliderComponent } from './public/widgets/boolean-slider/boolean-slider.component';
import { AddFoldersComponent } from './user/notes/popups/add-folders/add-folders.component';
import { PopupbodyComponent } from './public/widgets/popupbody/popupbody.component';
import { WorkspaceComponent } from './user/notes/workspace.component';
import { AuthorDashboardComponent } from './user/author-dashboard/author-dashboard.component';
import { MydashboardComponent } from './user/mydashboard/mydashboard.component';
import { BecomeAhostComponent } from './public/become-ahost/become-ahost.component';
import { ToasterComponent } from './public/widgets/toaster/toaster.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AboutusComponent,
    SignupComponent,
    SpinnersComponent,
    MenuComponent,
    LoginComponent,
    DashboardComponent,
    ConnectToStreamComponent,
    WorkspaceComponent,
    NewnotesComponent,
    BooleanSliderComponent,
    AddFoldersComponent,
    PopupbodyComponent,
    AuthorDashboardComponent,
    MydashboardComponent,
    BecomeAhostComponent,
    ToasterComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{provide:LocationStrategy,useClass:HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
