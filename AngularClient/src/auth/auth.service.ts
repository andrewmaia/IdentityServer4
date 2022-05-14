import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private oauthService: OAuthService,
    private router:Router
  ){ 
  }  

  autenticar(redirectUrl?: string){
    this.setRedirectUrl(redirectUrl);
    this.oauthService.initImplicitFlow('login');
  }

  logout(){
    this.oauthService.logOut();
  }


  setRedirectUrl(redirectUrl: string){
    localStorage.setItem('redirectUrl', redirectUrl);  
  }

  getRedirectUrl():string{
    return localStorage.getItem('redirectUrl');  
  }

  isLoggedIn(): boolean{
    return (this.oauthService.hasValidIdToken() || this.oauthService.hasValidAccessToken());
  }

  public async configureWithNewConfigApi() {
    this.oauthService.configure(authConfig);
    this.oauthService.setStorage(localStorage);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();

    await this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  public loadDiscoveryDocumentAndTryLogin(): Promise<boolean>{
    return this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }
  
  public getUserName(): string {
    let claims = this.oauthService.getIdentityClaims();
    if (!claims) 
      return '-';
    return claims['name'];
  }

 
}

