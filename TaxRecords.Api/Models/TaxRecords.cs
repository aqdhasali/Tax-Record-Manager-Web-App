using System.ComponentModel.DataAnnotations;

namespace TaxRecords.Api.Models;

public class TaxRecord
{
    public int Id { get; set; }
    public string RecordTitle { get; set; } = string.Empty;
    public int TaxYear { get; set; }
    public decimal IncomeAmount { get; set; }
    public decimal DeductionsAmount { get; set; }
    public string? Notes { get; set; }

    public decimal NetIncome  => IncomeAmount - DeductionsAmount; 
}