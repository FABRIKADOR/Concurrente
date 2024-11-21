using ChatWeb.Hubs; // Asegúrate de importar el namespace donde está tu ChatHub

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages(); // Soporte para Razor Pages
builder.Services.AddSignalR();   // Soporte para SignalR

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 días. Puedes ajustarlo según tu entorno de producción.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();  // Soporte para Razor Pages
app.MapHub<ChatHub>("/chatHub"); // Configurar la ruta para SignalR Hub

// Leer el puerto de la variable de entorno (necesario para plataformas como Render o Railway)
var port = Environment.GetEnvironmentVariable("PORT") ?? "5000"; // Usa 5000 como predeterminado para local
app.Run($"http://0.0.0.0:{port}");
