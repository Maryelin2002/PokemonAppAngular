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
    Pokemon pokemon = new Pokemon();

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
      var result = await pokemon.GetPokemon(id);

      if (result is null)
        return NotFound($"The record with id {id} was not found");

      return Ok(result);
    }
  }
}
