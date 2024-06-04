using Microsoft.AspNetCore.Mvc;
using MyProject.API.Models;
using MyProject.API.Models.DTO;
using MyProject.API.Repositories.Abstract;

namespace MyProject.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IConfiguration _config;
        private readonly IUserRepository _userRepo;

        public UserController(IConfiguration _config, IUserRepository _userRepo)
        {
            this._config = _config ?? throw new ArgumentNullException(nameof(_config));
            this._userRepo = _userRepo ?? throw new ArgumentNullException(nameof(_userRepo));
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var result = _userRepo.FindAll().ToList();
            return Ok(result);
        }


        [HttpGet("{id:int}")]
        public IActionResult GetByID(int id)
        {
            var result = _userRepo.FindByCondition(u => u.ID == id).FirstOrDefault();
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser(UserDTO user)
        {
            if (user == null)
            {
                return BadRequest();
            }

            var newItem = new User()
            {
               UserName = user.UserName,
               Password = user.Password,    
            };

            var result = await _userRepo.Create(newItem);

            return Created("user", result);
        }

        [HttpPut]
        public IActionResult Update(User user)
        {
            if (user == null)
            {
                return BadRequest();
            }
            var exists = _userRepo.FindByCondition(u => u.ID == user.ID).Any();

            if (!exists)
            {
                return NotFound();
            }

            var result = _userRepo.Update(user);

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            var user = _userRepo.FindByCondition(u => u.ID == id).FirstOrDefault();

            if (user == null)
            {
                return BadRequest();
            }

            _userRepo.Delete(user);
            return NoContent();
        }
    }
}
