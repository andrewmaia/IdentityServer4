import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';
import { OAuthService } from "angular-oauth2-oidc";

@Injectable({
    providedIn: 'root',
  })
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private oauthService: OAuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        
        if (this.oauthService.hasValidIdToken() || this.oauthService.hasValidAccessToken()) {
            return true;    
        }
        
        this.router.navigate(["/login"],{ queryParams: {returnUrl: url}});
    }


}