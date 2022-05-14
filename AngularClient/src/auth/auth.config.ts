import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {

    issuer: 'https://localhost:5001',
    clientId: 'angular',
    postLogoutRedirectUri: 'http://localhost:4200/home',
    redirectUri: window.location.origin + "/login-callback",
    scope:"openid profile recursoDeIdentidade1 api1",
    oidc: true,
}