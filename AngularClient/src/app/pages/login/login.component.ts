import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/auth/auth.service';

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit { 
  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.authService.autenticar(params['returnUrl']);
    });
  };
}


