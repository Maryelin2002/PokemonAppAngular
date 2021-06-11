import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  targetPoke = '';

  public pokemones: Pokemon[];

  constructor() { }

  
  getPoke(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Pokemon[]>(baseUrl + 'api/pokemon/' + this.targetPoke).subscribe(result => {
      this.pokemones = result;
    }, error => console.error(error));
  }
  

  /*
  getPoke(http: HttpClient) {
    http.get<Pokemon[]>('https://pokeapi.co/api/v2/pokemon/' + this.targetPoke).subscribe(result => {
      this.pokemones = result;
    }, error => console.error(error));
  }
  */

  ngOnInit() {
  }

}

interface Pokemon {
  abilities: [];
  base_experience: number;
  forms: [];
  game_indices: [];
  height: number;
  held_items: [];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: [];
  name: string;
  order: number;
  past_types: [];
  species: string;
  sprites: string;
  stats: string;
  types: string;
  weight: number;
}
