using System.Text.Json;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using QuoteSubscriberFn;

public class QuoteSubscriber
{
    private readonly ILogger _logger;

    public QuoteSubscriber(ILoggerFactory loggerFactory)
    {
        _logger = loggerFactory.CreateLogger<QuoteSubscriber>();    
    }

    [Function("QuoteSubscriber")]
    public async Task Run(
      [ServiceBusTrigger(
        "quotes-topic",
        Connection = "ServiceBusConnection")]
    string message)
    {
        try
        {
            var quote = JsonSerializer.Deserialize<QuoteDto>(message);

            _logger.LogInformation("📩 Received Quote:");
            _logger.LogInformation($"Email: {quote?.Email}");
            _logger.LogInformation($"Property: {quote?.PropertyValue}");
            _logger.LogInformation($"YearBuilt: {quote?.YearBuilt}");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to process message. Body: {Body}", message);
            throw;
        }

        await Task.CompletedTask;
    }
}