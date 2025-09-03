using Microsoft.EntityFrameworkCore;
using TaxRecords.Api.Data;
using TaxRecords.Api.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

/*EF Core InMemory */
builder.Services.AddDbContext<TaxDbContext>(opt =>
    opt.UseInMemoryDatabase("TaxDb"));

/* CORS For Angular Dev Server **/
builder.Services.AddCors(opt =>
{
    opt.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});


var app = builder.Build();

/* SEED DATA */
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<TaxDbContext>();
    if (!db.TaxRecords.Any())
    {
        db.TaxRecords.AddRange(
            new TaxRecord { RecordTitle = "Paycheck - 0925", TaxYear = 2023, IncomeAmount = 50000, DeductionsAmount = 1000, Notes = "Q1" },
            new TaxRecord { RecordTitle = "Event Coverage", TaxYear = 2025, IncomeAmount = 40000, DeductionsAmount = 2000, Notes = "WEVE22" }
        );

        db.SaveChanges();
    }
}

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("AllowAll");
app.MapControllers();


var urls = app.Configuration["ASPNETCORE_URLS"] ?? "http://localhost:5000";
app.Urls.Add(urls);

app.Run();