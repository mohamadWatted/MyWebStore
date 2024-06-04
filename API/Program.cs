using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MyProject.API.Context;
using MyProject.API.Models;
using MyProject.API.Repositories.Abstract;
using MyProject.API.Repositories.Implementation;
using Serilog;
using Serilog.Events;
using System.Text;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

Log.Logger = new LoggerConfiguration()
           .MinimumLevel.Debug()
           .WriteTo.Console(restrictedToMinimumLevel: LogEventLevel.Information)
           .CreateLogger();

builder.Services.AddDbContext<MainContext>(o =>
{
    o.UseSqlServer(builder.Configuration.GetConnectionString("MainDB"));
    o.EnableSensitiveDataLogging();
});

//builder.Services.AddTransient<IGalleryImageRepository, GalleryImage>();

// Add services to the container.



builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<ICustomerRepository, CustomerRepository>();
builder.Services.AddScoped<IGalleryImageRepository, GalleryImageRepository>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IOrderItemRepository, OrderItemRepository>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<ISubCategoryRepository, SubCategoryRepository>();
builder.Services.AddScoped<IDepartmentRepository, DepartmentRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ICartRepository, CartRepository>();


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "MyApi",
        Version = "v1",
        Description = "Des1"
    });
    options.CustomSchemaIds(type => type.ToString());
});


builder.Services.AddAuthentication("Bearer").AddJwtBearer(o =>
{
    o.TokenValidationParameters = new()
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateIssuerSigningKey = true,
        ValidAudience = builder.Configuration["Authentication"] ?? throw new ArgumentException("Authentication:Audience"),
        ValidIssuer = builder.Configuration["Authentication:Issuer"] ?? throw new ArgumentException("Authentication:Issuer"),
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.ASCII.GetBytes(builder.Configuration["Authentication:Secret"] ?? throw new ArgumentException("Authentication:Secret"))
            )
    };
});



builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});

builder.Services.AddControllers();

builder.Services.AddCors((o) =>
{
    o.AddPolicy("Open", b =>
        b.AllowAnyHeader()
        .AllowAnyOrigin()
        .AllowAnyMethod()
    );
});

var app = builder.Build();

//This code makes sure the DB is up to date every-time the api starts
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<MainContext>();
    context.Database.Migrate();
}

app.Use(async (ctx, next) =>
{
    var token = ctx.Request.Headers["Authorization"];
    if (token.LastOrDefault() is not null)
    {
        // parse token
        // get id
        // get user object from database
        User user = null;
        ctx.Items["User"] = user;
    }
    await next.Invoke();
});

app.UseDeveloperExceptionPage();
app.UseSwagger();
app.UseSwaggerUI(o => o.SwaggerEndpoint("/swagger/v1/swagger.json","My API V1"));
app.UseHttpsRedirection();

//app.UseAuthentication();
app.UseAuthorization();
app.UseCors("Open");
app.MapControllers();

app.Run();
