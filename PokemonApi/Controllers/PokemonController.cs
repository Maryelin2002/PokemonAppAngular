using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace PokemonApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PokemonController : ControllerBase
    {
        public string BaseUrl = "https://pokeapi.co/api/v2/pokemon/";

        [HttpGet("{id}")]
        public async Task<string> GetPokemons([FromRoute] int id)
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

            return res.Content.ReadAsStringAsync().Result;
        }
    }
}
