import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/heroe.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: ``
})
export class HeroPageComponent implements OnInit {

  public hero?: Hero
  constructor(
    private _heroService: HeroesService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ){}

  ngOnInit(): void {
    this._activatedRoute.params
    .pipe(
      delay(1000),
      switchMap( ( { id } ) => this._heroService.getHeroById( id ))
    )
    .subscribe( hero =>{
      if( !hero ){
        return this._router.navigate( ['/heroes/list'] )
      }
      this.hero = hero
      return
    }
    )
  }

  public goBack():void{
    this._router.navigate( ['/heroes/list'] )
  }
}
