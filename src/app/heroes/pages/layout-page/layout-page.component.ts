import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent {
  public sidebarItems = [
    {label:'Listado', icon:'label',  url:'./list'},
    {label:'Añadir',  icon:'add',    url:'./new-hero'},
    {label:'Buscar',  icon:'search', url:'./search'},
  ]

  constructor( private _authServie: AuthService, private _router: Router ){}

  public onLogout():void{
    this._authServie.logout()
    this._router.navigate( ['/auth'] )
  }

  get currentUser():User | undefined{
    return this._authServie.currentUser
  }
}
