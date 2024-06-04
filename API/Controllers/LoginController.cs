using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MyProject.API.Models;
using MyProject.API.Models.Collections;
using MyProject.API.Models.DTO;
using MyProject.API.Models.Enums;
using MyProject.API.Repositories.Abstract;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace MyProject.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : Controller
    {
        private readonly IConfiguration _config;
        private readonly IUserRepository _userRepo;


        public LoginController(IConfiguration _config, IUserRepository _userRepo)
        {
            this._config = _config ?? throw new ArgumentNullException(nameof(_config));
            this._userRepo = _userRepo ?? throw new ArgumentNullException(nameof(_userRepo));
        }

        [HttpPost]
        public IActionResult GetToken(LoginInfoDTO loginInfo)
        {
            // Validate loginInfo
            if (loginInfo == null)
            {
                return BadRequest();
            }

            try
            {
                // Validate user's credentials and retrieve user object
                User user = _userRepo.FindByCondition(u =>
                    u.EmailAddress == loginInfo.EmailAddress && u.Password == loginInfo.Password
                ).First();

                if (user == null)
                {
                    return Unauthorized();
                }

                // Choose the appropriate secret key based on user type
                var secretKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(
                    user.Type == UserType.Unknown
                        ? _config["Authentication:SecretAdmin"]
                        : _config["Authentication:SecretUser"]
                ));

                // Create signing credentials
                var creds = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                // Create claims for the token
                var claims = new List<Claim>
                {
                    new Claim("sub", user.ID.ToString()),
                    new Claim("usertype", user.Type.ToString())
                    // You can add more claims here
                };

                // Get issuer and audience from configuration
                string validAudience = _config["Authentication:Audience"];
                string validIssuer = _config["Authentication:Issuer"];

                // Create JWT token
                var token = new JwtSecurityToken(
                    validIssuer,
                    validAudience,
                    claims,
                    DateTime.UtcNow,
                    DateTime.UtcNow.AddDays(1),
                    creds
                );


                // Write token as a string
                var tokenStr = new JwtSecurityTokenHandler().WriteToken(token);

                // Return token string
                return Ok(tokenStr);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetUser")]
        public IActionResult GetUser()
        {
            try
            {
                var token = Request.Headers["Authorization"];
                token = token.ToString().Split("Bearer ")[1];
                var decodedToken = new JwtSecurityTokenHandler().ReadJwtToken(token);
                var userId = decodedToken.Claims.First().Value;
                var userQuery = _userRepo.FindByCondition(user => user.ID == int.Parse(userId)).Include(u => u.Cart)
                    .ThenInclude(cart => cart.OrderItems)
                    .ThenInclude(orderItems => orderItems.Product)
                    .ThenInclude(item => item.GalleryImage);

                var user = userQuery.FirstOrDefault();
                return Ok(user);
            }
            catch (Exception ex)
            {

                return StatusCode(500);
            }

        }

        [HttpPost]
        [Route("Register")]
        public IActionResult Register(LoginInfo registrationInfo)
        {
            // Validate registrationInfo
            if (registrationInfo == null || string.IsNullOrWhiteSpace(registrationInfo.UserName) || string.IsNullOrWhiteSpace(registrationInfo.Password))
            {
                return BadRequest("Invalid registration information.");
            }

            // Check if the user already exists
            if (_userRepo.FindByCondition(u => u.UserName == registrationInfo.UserName).Any())
            {
                return BadRequest("User already exists.");
            }

            // Create a new user
            User newUser = new User
            {
                FirstName = registrationInfo.FirstName,
                LastName = registrationInfo.LastName,
                UserName = registrationInfo.UserName,
                EmailAddress = registrationInfo.EmailAddress,
                Password = registrationInfo.Password,
                Type = UserType.Unknown // Or UserType.Admin based on your logic
            };

            // Add the new user to the database
            _userRepo.CreateWith(newUser, (_context) =>
            {
                var cart = new Cart {};
                _context.Cart.Add(cart);
                newUser.Cart = cart;
            }) ;
            _userRepo.Save();

            return Ok("User registered successfully.");
        }
    }
}