using QuoteApi;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton(_ =>
    new ServiceBusPublisher(
        builder.Configuration["ServiceBus:ConnectionString"]!
    ));

var app = builder.Build();

app.MapPost("/quotes", async (QuoteDto dto, ServiceBusPublisher bus) =>
{
    await bus.PublishQuoteAsync(dto);
    return Results.Ok();
});

app.Run();