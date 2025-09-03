using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaxRecords.Api.Models;
using TaxRecords.Api.Dtos;
using TaxRecords.Api.Data;

namespace TaxRecords.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TaxRecordsController : ControllerBase
{
    private readonly TaxDbContext _db;
    public TaxRecordsController(TaxDbContext db) => _db = db;
    private static TaxRecordDto ToDto(TaxRecord m) =>
        new(m.Id, m.RecordTitle, m.TaxYear, m.IncomeAmount, m.DeductionsAmount, m.Notes, m.IncomeAmount);

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaxRecordDto>>> GetAll(
        [FromQuery] int? taxYear,
        [FromQuery] string? search)
    {
        var query = _db.TaxRecords.AsQueryable();

        if (taxYear is not null)
            query = query.Where(r => r.TaxYear == taxYear);

        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(r => r.RecordTitle.Contains(search));

        var items = await query
            .OrderByDescending(r => r.TaxYear)
            .ThenBy(r => r.RecordTitle)
            .ToListAsync();

        return Ok(items.Select(ToDto));
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<TaxRecordDto>> GetById(int id)
    {
        var entity = await _db.TaxRecords.FindAsync(id);
        return entity is null ? NotFound() : Ok(ToDto(entity));
    }

    [HttpPost]
    public async Task<ActionResult<TaxRecordDto>> Create(CreateUpdateTaxRecordDto dto)
    {
        var entity = new TaxRecord
        {
            RecordTitle = dto.RecordTitle,
            TaxYear = dto.TaxYear,
            IncomeAmount = dto.IncomeAmount,
            DeductionsAmount = dto.DeductionsAmount,
            Notes = dto.Notes
        };

        _db.TaxRecords.Add(entity);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, ToDto(entity));
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<TaxRecordDto>> Update(int id, CreateUpdateTaxRecordDto dto)
    {
        var entity = await _db.TaxRecords.FindAsync(id);
        if (entity is null) return NotFound();

        entity.RecordTitle = dto.RecordTitle;
        entity.TaxYear = dto.TaxYear;
        entity.IncomeAmount = dto.IncomeAmount;
        entity.DeductionsAmount = dto.DeductionsAmount;
        entity.Notes = dto.Notes;

        await _db.SaveChangesAsync();
        return Ok(ToDto(entity));
    }


    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var entity = await _db.TaxRecords.FindAsync(id);
        if (entity is null) return NotFound();
        _db.TaxRecords.Remove(entity);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}

