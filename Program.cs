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
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();  // Soporte para Razor Pages
app.MapHub<ChatHub>("/chatHub"); // Configurar la ruta para SignalR Hub

app.Run();
