import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { MatButton } from '@angular/material/button';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  pokemon: any = '';
  pokemonImg = '';
  pokemonType = [];
  pokemonToSave: any = '';

  constructor(private activatedRouter: ActivatedRoute, private pokemonService: PokemonService) {
    this.activatedRouter.params.subscribe(
      params => {
        this.getPokemon(params['id']);
      }
    )
  }

  ngOnInit(): void { }

  getPokemon(id: any) {
    this.pokemonService.getPokemons(id).subscribe(
      result => {
        console.log(result);
        this.pokemon = result;
        this.pokemonImg = this.pokemon.sprites.front_default;
        this.pokemonType = result.types[0].type.name;

        this.pokemonToSave = (result.name + " / " + result.types[0].type.name + " / " + this.pokemon.height + " / " + this.pokemon.weight);
      },
      err => {
        console.log(err);
      }
    )
  }

  saveFile(pokemon_name: string) {
    var file = new Blob([this.pokemonToSave], { type: "text/plain;charset=utf-8" });
    FileSaver.saveAs(file, pokemon_name);
  }

}
