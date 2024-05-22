import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: ``
})
export class LoginPageComponent {

  constructor( private _authService: AuthService, private _router: Router ){}

  public login():void{
    this._authService.login('rolandgo@gmail.com', '12345')
    .subscribe( user => this._router.navigate( ['/'] ))
  }
}
