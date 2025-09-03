export interface TaxRecord{
    id: number;
    recordTitle: string;
    taxYear: number;
    incomeAmount: number;
    deductionsAmount: number;
    notes?: string | null;
    netIncome: number;
}


export interface CreateUpdateTaxRecord{
    recordTitle: string;
    taxYear: number;
    incomeAmount: number;
    deductionsAmount: number;
    notes?: string | null;
}