using System.Text.Json;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.WebJobs;
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
    public void Run(
        [ServiceBusTrigger(
            "quotes-topic",
            "logging-subscription",
            Connection = "ServiceBusConnection")]
        string message)
    {
        var quote = JsonSerializer.Deserialize<QuoteDto>(message);

        _logger.LogInformation("📩 Received Quote:");
        _logger.LogInformation($"Email: {quote?.Email}");
        _logger.LogInformation($"Property: {quote?.PropertyValue}");
        _logger.LogInformation($"YearBuilt: {quote?.YearBuilt}");
    }
}