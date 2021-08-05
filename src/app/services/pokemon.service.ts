import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pokemon } from './pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  baseUrl = environment.baseUrl;
  jsonResponse: any;
  

  constructor(private http: HttpClient) { }

  getPokemons(index: any) {
    return this.http.get<any>(`${this.baseUrl}/${index}`);
  }
}
