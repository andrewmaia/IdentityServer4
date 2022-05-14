import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { AuthService } from 'src/auth/auth.service';
import { authConfig } from '../auth/auth.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'AngularClient';
  constructor(
    public authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.authService.configureWithNewConfigApi();
  }

  ngOnInit() {
  }

  login(){
    let url = this.router.url;
    this.router.navigate(["/login"],{ queryParams: {returnUrl: url}});
  }


}
