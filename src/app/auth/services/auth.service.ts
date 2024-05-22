import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environments.baseUrl
  private user?: User
  constructor( private _httpClient: HttpClient) { }

  get currentUser(): User | undefined{
    if( !this.user ) return undefined
    return structuredClone(  this.user )
  }

  public login( email: string, password: string ):Observable<User>{
    return this._httpClient.get<User>(`${ this.baseUrl }/users/1`)
    .pipe(
      tap( (user:User) =>this.user = user),
      tap( (user: User) => localStorage.setItem('token', user.id.toString() ))
    )
  }

  public chechAuthentication():Observable<boolean>{
    if( !localStorage.getItem('token')) return of(false)

    const token = localStorage.getItem('token')

    return this._httpClient.get<User>(`${ this.baseUrl }/users/1`)
    .pipe(
      tap( (user:User) =>this.user = user),
      map( (user: User) => !!user ),
      catchError( err => of(false) )
    )
  }

  public logout(){
    this.user = undefined
    localStorage.clear()
  }
}
