import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './@core/core.module';
import { SharedModule } from './@shared/shared.module';
import { NavbarComponent } from './@shared//layout/navbar/navbar.component';
import { SidenavComponent } from './@shared/layout/sidenav/sidenav.component';
import { AuthLayoutComponent } from './@shared/layout/auth-layout/auth-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidenavComponent,
    AuthLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
