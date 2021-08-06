using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace PokemonApi
{
	public class GetPokemons
	{
		public string BaseUrl = "https://pokeapi.co/api/v2/pokemon/";

		public async Task<string> GetPokemon(int id)
		{
			Pokemon pokemon = new Pokemon();

			using var client = new HttpClient();
			client.BaseAddress = new Uri(BaseUrl);

			HttpResponseMessage res = await client.GetAsync($"{id}");
			if (res.IsSuccessStatusCode)
			{
				var jsonResponse = res.Content.ReadAsStringAsync().Result;
				pokemon = JsonConvert.DeserializeObject<Pokemon>(jsonResponse);
			}

      var result = res.Content.ReadAsStringAsync().Result;

      return result;
		}
	}
}
