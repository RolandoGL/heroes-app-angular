import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../../components/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent implements OnInit {

  public publisher = [
    {id:'DC Comics', desc: 'DC Comics'},
    {id:'MArvel Comics', desc: 'Marvel Comics'},
  ]

  public heroForm = new FormGroup({
    id : new FormControl<string>( {value: '', disabled: true}, { nonNullable: true } ),
    superhero : new FormControl<string>( '', { nonNullable: true } ),
    publisher : new FormControl<Publisher>( Publisher.DCComics ),
    alter_ego : new FormControl<string>( '' ),
    first_appearance : new FormControl<string>( '' ),
    characters : new FormControl<string>( '' ),
    alt_img : new FormControl<string>( '' ),
  })

  constructor(
    private _heroService: HeroesService,
    private _activetedRoute: ActivatedRoute,
    private _router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
   ){}

  ngOnInit(): void {
    if ( !this._router.url.includes('edit')) return
    this.heroForm.get('id')?.enable()
    this._activetedRoute.params
    .pipe( switchMap( ({id}) => this._heroService.getHeroById( id ) ) )
    .subscribe( hero =>{
      if( !hero ) return this._router.navigateByUrl('/')
      this.heroForm.reset(hero)
      return
    })
  }

   get getCurrentHero(): Hero{
    const hero = this.heroForm.value as Hero
    return hero
  }
  public onSubmit():void{
    if( this.heroForm.invalid ) return

    if( this.getCurrentHero.id ){
      this._heroService.updateHero( this.getCurrentHero )
      .subscribe( hero => {
        this.showSnackBar(`${hero.superhero} updated!`)
      })
      return
    }
    console.log(this.getCurrentHero)
    this._heroService.addHero( this.getCurrentHero )
      .subscribe( hero => {
        this.showSnackBar(`${hero.superhero} created!`)
        this._router.navigate(['/heroes/edit', hero.id])
      })
    return

  }

  public onDeleteConfirm():void{
    if( !this.getCurrentHero.id ) throw new Error('Id is requiered')

    const dialogRef = this.dialog.open( DialogConfirmComponent, {
      data: this.heroForm.value
    })
    // dialogRef.afterClosed().subscribe( result =>{
    //   if( !result ) return
    //   this._heroService.deleteHero( this.getCurrentHero.id )
    //   .subscribe( res => {
    //     if( res ) this._router.navigate(['/heroes'])
    //   })
    // })
    dialogRef.afterClosed()
    .pipe(
      filter( (result: boolean) => result),
      switchMap( () => this._heroService.deleteHero( this.getCurrentHero.id )),
      filter( (wasDeleted: boolean ) => wasDeleted )
    )
    .subscribe( () => this._router.navigate(['/heroes']))
  }

  public showSnackBar( message: string): void{
    this.snackbar.open( message, 'done', {
      duration: 2500
    })
  }
}


