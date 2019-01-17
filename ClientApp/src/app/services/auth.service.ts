import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';
import Auth0Lock from 'auth0-lock';
import { AUTH_CONFIG } from '../common/auth0-variables'

@Injectable()
export class AuthService {
  lock = new Auth0Lock(AUTH_CONFIG.clientID, AUTH_CONFIG.domain, {
    autoclose: true,
    auth: {
      redirectUrl: AUTH_CONFIG.callbackURL,
      responseType: 'token',
      params: {
        scope: 'openid'
      }
    }
  });

  constructor(public router: Router) {}

  public login(): void {
    this.lock.show();
  }

  // Call this method in app.component.ts
  // if using path-based routing
  public handleAuthentication(): void {
    this.lock.on('authenticated', (authResult) => {
      console.log("authResult", authResult);
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.router.navigate(['/']);
      }
    });
    this.lock.on('authorization_error', (err) => {
      this.router.navigate(['/']);
      console.log(err);
      alert(`Error: ${err.error}. Check the console for further details.`);
    });
  }

  // Call this method in app.component.ts
  // if using hash-based routing
  public handleAuthenticationWithHash(): void {
    this
      .router
      .events
      .pipe(
        filter(event => event instanceof NavigationStart),
        filter((event: NavigationStart) => (/access_token|token|error/).test(event.url))
      )
      .subscribe(() => {
        this.lock.resumeAuth(window.location.hash, (err, authResult) => {
          if (err) {
            this.router.navigate(['/']);
            console.log(err);
            alert(`Error: ${err.error}. Check the console for further details.`);
            return;
          }
          this.setSession(authResult);
          this.router.navigate(['/']);
        });
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }


  // private _idToken: string;
  // private _accessToken: string;
  // private _expiresAt: number;

  // auth0 = new auth0.WebAuth({
  //   clientID: 'rIBtG64LD7IuSGG9e7yCequNBovvTDD0',
  //   domain: 'sellmyvehicle.auth0.com',
  //   responseType: 'token token',
  //   redirectUri: 'http://localhost:5000/vehicles',
  //   scope: 'openid'
  // });

  // constructor(public router: Router) {
  //   this._idToken = '';
  //   this._accessToken = '';
  //   this._expiresAt = 0;
  // }

  // get accessToken(): string {
  //   return this._accessToken;
  // }

  // get idToken(): string {
  //   return this._idToken;
  // }

  // public login(): void {
  //   this.auth0.authorize();
  // }

  // public handleAuthentication(): void {
  //   this.auth0.parseHash((err, authResult) => {
  //     if (authResult && authResult.accessToken && authResult.idToken) {
  //       window.location.hash = '';
  //       this.localLogin(authResult);
  //       this.router.navigate(['/vehicles']);
  //     } else if (err) {
  //       this.router.navigate(['/vehicles']);
  //       console.log(err);
  //     }
  //   });
  // }

  // private localLogin(authResult): void {
  //   // Set isLoggedIn flag in localStorage
  //   localStorage.setItem('isLoggedIn', 'true');
  //   // Set the time that the access token will expire at
  //   const expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
  //   this._accessToken = authResult.accessToken;
  //   this._idToken = authResult.idToken;
  //   this._expiresAt = expiresAt;
  // }

  // public renewTokens(): void {
  //   this.auth0.checkSession({}, (err, authResult) => {
  //     if (authResult && authResult.accessToken && authResult.idToken) {
  //       this.localLogin(authResult);
  //     } else if (err) {
  //       alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
  //       this.logout();
  //     }
  //   });
  // }

  // public logout(): void {
  //   // Remove tokens and expiry time
  //   this._accessToken = '';
  //   this._idToken = '';
  //   this._expiresAt = 0;
  //   // Remove isLoggedIn flag from localStorage
  //   localStorage.removeItem('isLoggedIn');
  //   // Go back to the home route
  //   this.router.navigate(['/']);
  // }

  // public isAuthenticated(): boolean {
  //   // Check whether the current time is past the
  //   // access token's expiry time
  //   return new Date().getTime() < this._expiresAt;
  // }
}