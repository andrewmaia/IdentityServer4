import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginCallbackComponent } from './pages/login-callback/login-callback.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { PaginaProtegidaComponent } from './pages/pagina-protegida/pagina-protegida.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginCallbackComponent,
    PaginaProtegidaComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OAuthModule.forRoot()
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
