import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Form, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { not } from 'rxjs/internal/util/not';
import { ActivatedRoute } from '@angular/router';
import { TaxRecordService } from '../../services/tax-record.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateUpdateTaxRecord } from '../../models/tax-records';

@Component({
  selector: 'app-tax-record-form',
  imports: [CommonModule, ReactiveFormsModule],
  standalone : true,
  templateUrl: './tax-record-form.html',
  styleUrl: './tax-record-form.css'
})

export class TaxRecordForm implements OnInit{
  id?: number;
  title = 'New Tax Record';
  submitting = false;
  form : FormGroup;
  
  constructor(
    private fb: FormBuilder, 
    private route: ActivatedRoute, 
    private router: Router, 
    private api : TaxRecordService
  ){
    this.form = this.fb.group({
    recordTitle : ['', [Validators.required, Validators.maxLength(120)]],
    taxYear : [new Date().getFullYear(), [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
    incomeAmount : [0, [Validators.required, Validators.min(0)]],
    deductionsAmount : [0, [Validators.required, Validators.min(0)]],
    notes : ['']
  });
  }

  ngOnInit() : void{
    const idParam = this.route.snapshot.paramMap.get('id');
    if(idParam) {
      this.id = +idParam;
      this.title = 'Edit Tax Record';
      this.api.get(this.id).subscribe({
        next: record => this.form.patchValue({
          recordTitle: record.recordTitle,
          taxYear: record.taxYear,
          incomeAmount: record.incomeAmount,
          deductionsAmount: record.deductionsAmount,
          notes: record.notes ?? ''
        }),
        error:_ => alert('Failed to load tax record')
      })
    }
  }

  onSubmit() : void {
    if(this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.submitting = true;
    const payload: CreateUpdateTaxRecord = this.form.getRawValue() as any;

    const req$ = this.id ? this.api.update(this.id, payload) : this.api.create(payload);
    req$.subscribe({
      next: _ => this.router.navigate(['/']),
      error: _ => { this.submitting = false; alert('Failed to submit tax record'); }
    });
  }

  cancel() : void {
    this.router.navigateByUrl('');
  }

}
