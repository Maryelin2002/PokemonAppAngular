import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Pokemon } from 'src/app/services/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-table',
  templateUrl: './pokemon-table.component.html',
  styleUrls: ['./pokemon-table.component.scss']
})
export class PokemonTableComponent implements OnInit {
  baseUrl = environment.baseUrl;
  pokemons: Pokemon[] | undefined;

  displayedColumns: string[] = ['position', 'image', 'name'];
  data: any[] = [];
  dataSource = new MatTableDataSource<any>(this.data);


  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  constructor(private pokemonService: PokemonService, private router: Router) { }

  ngOnInit(): void {
    this.getPokemons();
  }


  getPokemons() {
    let pokemonData;

    for (let i = 1; i <= 150; i++) {
      this.pokemonService.getPokemons(i).subscribe((result: any) => {
        
        pokemonData = {
          position: i,
          image: result.sprites.front_default,
          name: result.name
        };

        this.data.push(pokemonData);
        this.dataSource = new MatTableDataSource<any>(this.data);
        this.dataSource.paginator = this.paginator;
        
      }, (error: any) => console.error(error));
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getRow(row: { position: any; }) {
    //console.log(row);
    this.router.navigateByUrl(`/pokemonDetail/${row.position}`)
  }
}

