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
import { ProposalComponent } from './public/proposal/proposal.component';
import { OtpVerifierComponent } from './public/widgets/otp-verifier/otp-verifier.component';
import { AdminDashboardComponent } from './user/admin-dashboard/admin-dashboard.component';
import { DomainsViewComponent } from './user/domains-view/domains-view.component';
import {MatTreeModule} from '@angular/material/tree';
import { DomainTreeComponent } from './user/domain-tree/domain-tree.component';
import { PopupComponent } from './public/widgets/popup/popup.component';
import { ManageUsersComponent } from './user/admin/manage-users/manage-users.component';
import { UploadCsvHelperComponent } from './public/widgets/popup/content/upload-csv-helper/upload-csv-helper.component';
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
    ToasterComponent,
    ProposalComponent,
    OtpVerifierComponent,
    AdminDashboardComponent,
    DomainsViewComponent,
    DomainTreeComponent,
    PopupComponent,
    ManageUsersComponent,
    UploadCsvHelperComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatTreeModule
  

  ],
  providers: [{provide:LocationStrategy,useClass:HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
