import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TaxRecordService  } from '../../services/tax-record.service';
import { TaxRecord } from '../../models/tax-records'; 

type SortKey = 'taxYear' | 'recordTitle' | 'incomeAmount' | 'deductionsAmount' | 'netIncome';

@Component({
  selector: 'app-tax-record-list',
  standalone : true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tax-record-list.html',
  styleUrl: './tax-record-list.css'
})

export class TaxRecordList implements OnInit {
  records: TaxRecord[] = [];
  loading = false;
  search = '';
  taxYear?: number;
  sortKey: SortKey = 'taxYear';
  sortAsc = false;

  constructor(private api: TaxRecordService, private router: Router) {}
  ngOnInit(): void {this.load();}

  load(){
    this.loading = true;
    this.api.getAll({ taxYear: this.taxYear, search: this.search.trim() || undefined })
      .subscribe({ 
        next: data => { this.records = this.sortLocal(data); this.loading = false; },
        error: _ => { this.loading = false; alert('Failed to load tax records'); }
      });
  }

  setSort(key: SortKey){
    if(this.sortKey === key) this.sortAsc = !this.sortAsc;
    else { this.sortKey; const dir  = this.sortAsc ? 1 : -1; }
    this.records = this.sortLocal(this.records.slice());
  }

  sortLocal(items: TaxRecord[]): TaxRecord[] {
    const key = this.sortKey; const dir = this.sortAsc ? 1 : -1;
    return items.sort((a: any, b: any) => (a[key] > b[key] ? dir : a[key] < b[key] ? -dir : 0));
  }

  gotoNew() { this.router.navigate(['/new']); }
  gotoEdit(id: number) { this.router.navigate(['/edit', id]); }
  confirmDelete(id: number) {
    if (confirm('Are you sure you want to delete this tax record?')) {
      this.api.delete(id).subscribe({
        next: () => this.load(),
        error: () => alert('Failed to delete tax record')
      });
    }
  }

}
