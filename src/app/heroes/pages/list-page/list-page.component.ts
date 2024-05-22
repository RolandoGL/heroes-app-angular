import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: ``
})
export class ListPageComponent implements OnInit{
  public heroes: Hero[] = []

  constructor( private _heroService: HeroesService ){}

  ngOnInit(): void {
    this._heroService.getHeroes().subscribe( resp => this.heroes = resp)
  }


}
