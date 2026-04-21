namespace QuoteApi
{
    public static class QuoteEndpoint
    {
        public static void MapNewQuote(this IEndpointRouteBuilder builder)
        {
            builder.MapPost("/quotes", async (QuoteDto dto, ServiceBusPublisher bus) =>
            {
                await bus.PublishQuoteAsync(dto);
                return Results.Ok(new { status = "queued" });
            });
        }
    }
}