import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './public/widgets/header/header.component';
import { HomeComponent } from './public/home/home.component';
import { AboutusComponent } from './public/aboutus/aboutus.component';
import { SignupComponent } from './public/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AboutusComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
