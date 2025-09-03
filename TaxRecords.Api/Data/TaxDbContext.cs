using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using TaxRecords.Api.Models;

namespace TaxRecords.Api.Data;

public class TaxDbContext : DbContext
{
    public TaxDbContext(DbContextOptions<TaxDbContext> options) : base(options) { }
    
    public DbSet<TaxRecord> TaxRecords => Set<TaxRecord>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TaxRecord>()
        .Property(p => p.IncomeAmount).HasPrecision(18, 2);
        modelBuilder.Entity<TaxRecord>()
        .Property(p => p.DeductionsAmount).HasPrecision(18, 2);
    }
}