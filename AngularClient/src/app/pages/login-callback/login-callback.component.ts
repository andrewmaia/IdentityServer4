import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from 'src/auth/auth.service';

@Component({
    template: ''
})
export class LoginCallbackComponent implements OnInit {

    constructor(
        private router: Router,
        private authService: AuthService
    ) {}

    ngOnInit() {
         this.authService.loadDiscoveryDocumentAndTryLogin().then(_ => {
            if (!this.authService.isLoggedIn()) {
                this.authService.autenticar();
            } else {
                let redirectUrl = this.authService.getRedirectUrl();
                if(typeof redirectUrl !== 'undefined')
                    this.router.navigate([redirectUrl]);
                else
                    this.router.navigate(['/home']);                
                    
            }
        });
    }
}