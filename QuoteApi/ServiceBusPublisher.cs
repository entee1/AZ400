namespace QuoteApi
{
    using Azure.Messaging.ServiceBus;
    using System.Text.Json;

    public class ServiceBusPublisher
    {
        private readonly ServiceBusClient _client;
        private readonly string _topicName = "quotes-topic";

        public ServiceBusPublisher(string connectionString)
        {
            _client = new ServiceBusClient(connectionString);
        }

        public async Task PublishQuoteAsync(QuoteDto quote)
        {
            var sender = _client.CreateSender(_topicName);

            var messageBody = JsonSerializer.Serialize(quote);

            var message = new ServiceBusMessage(messageBody)
            {
                Subject = "QuoteCreated"
            };

            await sender.SendMessageAsync(message);
        }
    }
}