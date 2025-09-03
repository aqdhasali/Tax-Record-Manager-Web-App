import { Routes } from '@angular/router';
import { TaxRecordList } from './components/tax-record-list/tax-record-list';
import { TaxRecordForm } from './components/tax-record-form/tax-record-form';

export const routes: Routes = [
    { path: '', component: TaxRecordList},
    { path: '', component: TaxRecordForm},
    { path: 'edit/:id', component:TaxRecordForm},
    { path: '**', redirectTo:''}
];
