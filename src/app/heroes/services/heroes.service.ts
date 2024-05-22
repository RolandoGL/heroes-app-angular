import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, catchError, map, of } from 'rxjs';
import { Hero } from '../interfaces/heroe.interface';
import { environments } from '../../../environments/environments';
@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private baseUrl: string = environments.baseUrl

  constructor( private _htppClient: HttpClient ) { }

  public getHeroes():Observable<Hero[]>{
    return this._htppClient.get<Hero[]>( `${this.baseUrl}/heroes` )
  }

  getHeroById( id: string ):Observable<Hero | undefined >{
    return this._htppClient.get<Hero>( `${ this.baseUrl }/heroes/${ id }`)
            .pipe(
              catchError( error => of( undefined ) )
            )
  }


  getSuggestions( query: string ): Observable<Hero[]> {
    return this._htppClient.get<Hero[]>(`${ this.baseUrl }/heroes?q=${ query }`)
              .pipe(
                map( heroes => heroes.filter( hero => hero.superhero.toLocaleLowerCase().includes( query )) )
              );
  }

  addHero( hero: Hero ):Observable<Hero>{
    return this._htppClient.post<Hero>(`${this.baseUrl}/heroes`, hero)
  }

  updateHero( hero: Hero ):Observable<Hero>{
    if( !hero.id ) throw Error('Hero ID is required')
    return this._htppClient.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero)
  }

  deleteHero( id: string ):Observable<boolean>{
    return this._htppClient.delete(`${this.baseUrl}/heroes/${id}`)
            .pipe(
              map( resp =>  true ),
              catchError( err => of( false ) )
            )
  }

}
