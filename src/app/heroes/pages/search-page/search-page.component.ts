import { Component } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/heroe.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: ``
})
export class SearchPageComponent {
  public searchInput = new FormControl()
  public heroes: Hero[] = []
  public selectedHeroOption: string = ''
  constructor( private _heroService: HeroesService ){}


  public searchHero():void{
    const value: string = this.searchInput.value || ''
    this._heroService.getSuggestions( value )
    .subscribe( heroes => this.heroes = heroes )
  }

  public onSelectedOption( event: MatAutocompleteSelectedEvent ):void{
    if( !event.option.value ) return

    const hero: Hero = event.option.value
    this.searchInput.setValue( hero.superhero )
  }
}
