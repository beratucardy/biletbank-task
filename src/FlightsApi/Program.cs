using FlightsApi;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<IAirports, Airports>();
builder.Services.AddSingleton<IFlights, Flights>();
builder.Services.AddCors(policyBuilder =>
    policyBuilder.AddDefaultPolicy(policy =>
        policy.WithOrigins("*").AllowAnyHeader().AllowAnyHeader())
);
var app = builder.Build();

app.Urls.Add("http://localhost:5432");
app.UseCors();
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Flights Api");
});

app.MapGet("/airports", (IAirports api) => { return api.List(); });
app.MapPost("/searchflights", (SearchRequest searchRequest,
                                IFlights api) =>
                                    { return api.Search(searchRequest); });

app.Run();
