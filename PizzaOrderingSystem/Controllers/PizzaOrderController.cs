using System.IO;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using PizzaOrderingSystem.ViewModel;

namespace PizzaOrderingSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("MyPolicy")]
    public class PizzaOrderController : ControllerBase
    {
        
        [HttpGet("getpizza")]
        public string Get()
        {
            var data = System.IO.File.ReadAllText("../PizzaOrderingSystem/data/PizzaDetails.json");
            return data;
        }

        [HttpGet("getingredients")]
        public string GetIngredients()
        {
            var data = System.IO.File.ReadAllText("../PizzaOrderingSystem/data/Ingredients.json");
            return data;
        }

        [HttpPost("placeorder")]
        public void Post([FromBody] PizzaOrder value)
        {

            var count = System.IO.File.ReadAllLines("orderData.txt").Length;

            value.Id = count + 1;
            using (StreamWriter writer = System.IO.File.AppendText("orderData.txt"))
            {
                writer.WriteLine(JsonConvert.SerializeObject(value));
            }
        }


       
    }
}
