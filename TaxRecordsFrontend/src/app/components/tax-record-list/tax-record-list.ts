import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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

export class TaxRecordList {
  records: TaxRecord[] = [];
  loading = false;
  taxYear?: number;
  sortKey: SortKey = 'taxYear';
  sortAsc = false;


}
