import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateUpdateTaxRecord, TaxRecord } from '../models/tax-records';

@Injectable({ providedIn: 'root' })
export class TaxRecordService {
  private baseUrl = `${environment.apiBaseUrl}/taxrecords`;
  constructor(private http: HttpClient) {}

  getAll(filters?: { taxYear?: number; search?: string }): Observable<TaxRecord[]> {
    let params = new HttpParams();
    if(filters?.taxYear) params = params.set('taxYear', filters.taxYear);
    if(filters?.search) params = params.set('search', filters.search);
    return this.http.get<TaxRecord[]>(this.baseUrl, { params });
  }
  get(id:number) { return this.http.get<TaxRecord>(`${this.baseUrl}/${id}`);}
  create(payload: CreateUpdateTaxRecord) { return this.http.post<TaxRecord>(this.baseUrl, payload);}
  update(id: number, payload: CreateUpdateTaxRecord) { return this.http.put<TaxRecord>(`${this.baseUrl}/${id}}`,payload);}
  delete(id:number) { return this.http.delete<void>(`${this.baseUrl}/${id}`);}
}
