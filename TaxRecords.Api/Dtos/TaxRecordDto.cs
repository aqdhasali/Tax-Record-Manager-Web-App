using System.ComponentModel.DataAnnotations;

namespace TaxRecords.Api.Dtos;

public record TaxRecordDto(
    int Id,
    string RecordTitle,
    int TaxYear,
    decimal IncomeAmount,
    decimal DeductionsAmout,
    string? Notes,
    decimal NetIncomel
);

public class CreateUpdateTaxRecordDto
{
    public string RecordTitle { get; set; } = string.Empty;
    public int TaxYear { get; set; }
    public decimal IncomeAmount { get; set; }
    public decimal DeductionsAmount { get; set; }
    public string? Notes { get; set;}
}