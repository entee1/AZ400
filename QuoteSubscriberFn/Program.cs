using Microsoft.Extensions.Hosting;

    

var host = new HostBuilder()
    .ConfigureFunctionsWorkerDefaults()
     .ConfigureServices(services =>
     {
         services.AddSingleton<ServiceBusClientFactory>();
     })
    .Build();

host.Run();