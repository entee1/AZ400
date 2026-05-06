using QuoteApi;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton(_ =>
    new ServiceBusPublisher(
        builder.Configuration.GetConnectionString("ServiceBus")
        ?? builder.Configuration["ServiceBus:ConnectionString"]
        ?? builder.Configuration["ServiceBusConnectionString"]!
    ));

var app = builder.Build();

app.MapPost("/quotes", async (QuoteDto dto, ServiceBusPublisher bus) =>
{
    await bus.PublishQuoteAsync(dto);
    return Results.Ok();
});

app.Run();