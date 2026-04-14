using System.Text.Json;
using Confluent.Kafka;

var config = new ProducerConfig
{
    BootstrapServers = "localhost:9092"
};

using var producer = new ProducerBuilder<Null, string>(config).Build();

var httpClient = new HttpClient();

string url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd";

Console.WriteLine("Starting producer...");

while (true)
{
    try
    {
        var response = await httpClient.GetStringAsync(url);

        var message = new
        {
            Timestamp = DateTime.UtcNow,
            Data = JsonSerializer.Deserialize<object>(response)
        };

        var json = JsonSerializer.Serialize(message);

        await producer.ProduceAsync("crypto-prices", new Message<Null, string>
        {
            Value = json
        });

        Console.WriteLine($"Sent: {json}");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error: {ex.Message}");
    }

    await Task.Delay(3000); // poll every 3 seconds
}