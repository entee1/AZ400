using QuoteApi;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("ServiceBus")
    ?? builder.Configuration["ServiceBus:ConnectionString"]
    ?? builder.Configuration["ServiceBusConnectionString"];

Console.WriteLine($"DEBUG: ConnectionString found: {!string.IsNullOrEmpty(connectionString)}");
Console.WriteLine($"DEBUG: ConnectionStrings__ServiceBus: {builder.Configuration.GetConnectionString("ServiceBus") ?? "(null)"}");
Console.WriteLine($"DEBUG: ServiceBus__ConnectionString: {builder.Configuration["ServiceBus:ConnectionString"] ?? "(null)"}");
Console.WriteLine($"DEBUG: ServiceBusConnectionString: {builder.Configuration["ServiceBusConnectionString"] ?? "(null)"}");

builder.Services.AddSingleton(_ =>
    new ServiceBusPublisher(connectionString!));

var app = builder.Build();

app.MapPost("/quotes", async (QuoteDto dto, ServiceBusPublisher bus) =>
{
    await bus.PublishQuoteAsync(dto);
    return Results.Ok();
});

app.Run();